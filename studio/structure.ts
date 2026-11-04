import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {apiVersion, reservaVencida} from './schemaTypes/itemBazar'

// Validade guardada como data: o item vence no fim desse dia, no horário de Brasília.
const foraDaValidade = 'dateTime(validade + "T23:59:59-03:00") < dateTime(now())'

const jaPublicado = 'dateTime(publicadoEm) <= dateTime(now())'

const listaDoBlog = (S: StructureBuilder, titulo: string, filtro: string) =>
  S.listItem()
    .title(titulo)
    .child(
      S.documentList()
        .title(titulo)
        .schemaType('post')
        .apiVersion(apiVersion)
        .filter(`_type == "post" && ${filtro}`)
        .defaultOrdering([{field: 'publicadoEm', direction: 'desc'}]),
    )

const listaDoBazar = (S: StructureBuilder, titulo: string, filtro: string) =>
  S.listItem()
    .title(titulo)
    .child(
      S.documentList()
        .title(titulo)
        .schemaType('itemBazar')
        .apiVersion(apiVersion)
        .filter(`_type == "itemBazar" && ${filtro}`)
        .defaultOrdering([{field: '_createdAt', direction: 'desc'}]),
    )

// Menu lateral do painel: um grupo para o bazar e outro para o blog.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('Bazar')
        .child(
          S.list()
            .title('Bazar')
            .items([
              listaDoBazar(S, 'Disponíveis', 'situacao == "disponivel" && quantidade > 0'),
              listaDoBazar(
                S,
                'Reservados',
                `situacao == "reservado" && !(defined(reservadoAte) && ${reservaVencida})`,
              ),
              listaDoBazar(S, 'Reservas vencidas', `situacao == "reservado" && ${reservaVencida}`),
              listaDoBazar(S, 'Vendidos ou esgotados', 'situacao == "vendido" || quantidade == 0'),
              listaDoBazar(
                S,
                'Fora da validade',
                `situacao != "vendido" && defined(validade) && ${foraDaValidade}`,
              ),
              S.divider(),
              S.documentTypeListItem('itemBazar').title('Todos os itens'),
            ]),
        ),
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              listaDoBlog(S, 'No ar', jaPublicado),
              listaDoBlog(S, 'Agendadas', `defined(publicadoEm) && !(${jaPublicado})`),
              S.divider(),
              S.documentTypeListItem('post').title('Todas as publicações'),
            ]),
        ),
    ])
