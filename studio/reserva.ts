import {useState} from 'react'
import {useClient, type DocumentActionComponent, type DocumentActionsResolver} from 'sanity'
import {apiVersion} from './schemaTypes/itemBazar'

// Quantos dias úteis a peça fica segura depois de reservada. Sábado e domingo não contam; feriados contam.
export const DIAS_DE_RESERVA = 2

/** Último dia da reserva no formato do campo de data (AAAA-MM-DD). */
export function fimDaReserva(hoje = new Date()): string {
  const dia = new Date(hoje)
  let uteis = 0
  while (uteis < DIAS_DE_RESERVA) {
    dia.setDate(dia.getDate() + 1)
    if (dia.getDay() !== 0 && dia.getDay() !== 6) uteis++
  }
  const mes = String(dia.getMonth() + 1).padStart(2, '0')
  return `${dia.getFullYear()}-${mes}-${String(dia.getDate()).padStart(2, '0')}`
}

const dataBR = (data: string) => data.split('-').reverse().join('/')

type ItemBazar = {situacao?: string; quantidade?: number}
type Patch = ReturnType<ReturnType<typeof useClient>['patch']>

/**
 * Grava a mudança no item publicado e, se houver alterações ainda não publicadas, também nelas,
 * para a reserva valer no site na hora sem publicar junto o que a equipe ainda está editando.
 */
function useMudarSituacao(props: Parameters<DocumentActionComponent>[0]) {
  const client = useClient({apiVersion})
  const [salvando, setSalvando] = useState(false)

  const aplicar = async (mudar: (patch: Patch) => Patch) => {
    setSalvando(true)
    const transacao = client.transaction()
    if (props.published) transacao.patch(mudar(client.patch(props.id)))
    if (props.draft) transacao.patch(mudar(client.patch(props.draft._id)))
    try {
      await transacao.commit()
    } finally {
      setSalvando(false)
      props.onComplete()
    }
  }
  return {salvando, aplicar}
}

export const ReservarAction: DocumentActionComponent = (props) => {
  const {salvando, aplicar} = useMudarSituacao(props)
  const item = props.published as ItemBazar | null
  // Só peças únicas, já publicadas e à venda podem ser reservadas.
  if (!item || item.quantidade !== 1 || item.situacao !== 'disponivel') return null

  const ate = fimDaReserva()
  return {
    label: salvando ? 'Reservando…' : `Reservar por ${DIAS_DE_RESERVA} dias úteis`,
    title: `A peça fica reservada até ${dataBR(ate)}. Depois volta a aparecer como disponível.`,
    tone: 'primary',
    disabled: salvando,
    onHandle: () => aplicar((patch) => patch.set({situacao: 'reservado', reservadoAte: ate})),
  }
}
ReservarAction.displayName = 'ReservarAction'

export const LiberarReservaAction: DocumentActionComponent = (props) => {
  const {salvando, aplicar} = useMudarSituacao(props)
  const item = props.published as ItemBazar | null
  if (item?.situacao !== 'reservado') return null

  return {
    label: salvando ? 'Liberando…' : 'Liberar reserva',
    title: 'A peça volta a ficar disponível no site.',
    disabled: salvando,
    onHandle: () => aplicar((patch) => patch.set({situacao: 'disponivel'}).unset(['reservadoAte'])),
  }
}
LiberarReservaAction.displayName = 'LiberarReservaAction'

export const acoesDoBazar: DocumentActionsResolver = (anteriores, {schemaType}) =>
  schemaType === 'itemBazar'
    ? [...anteriores.slice(0, 1), ReservarAction, LiberarReservaAction, ...anteriores.slice(1)]
    : anteriores
