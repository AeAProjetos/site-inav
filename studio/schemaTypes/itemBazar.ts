import {defineArrayMember, defineField, defineType} from 'sanity'

export const apiVersion = '2026-10-01'

// Para mudar as categorias, edite esta lista. O "value" é o que o site usa; não mude o de uma categoria que já tem itens.
export const categorias = [
  {title: 'Roupas e calçados', value: 'roupas-calcados'},
  {title: 'Casa e móveis', value: 'casa-moveis'},
  {title: 'Eletrônicos e eletrodomésticos', value: 'eletronicos'},
  {title: 'Brinquedos e livros', value: 'brinquedos-livros'},
  {title: 'Higiene e beleza', value: 'higiene-beleza'},
  {title: 'Outros', value: 'outros'},
]

export const conservacoes = [
  {title: 'Novo', value: 'novo'},
  {title: 'Usado, em ótimo estado', value: 'otimo'},
  {title: 'Usado, com marcas de uso', value: 'marcas'},
]

export const situacoes = [
  {title: 'Disponível', value: 'disponivel'},
  {title: 'Reservado', value: 'reservado'},
  {title: 'Vendido', value: 'vendido'},
]

// Uma reserva vale até o fim do dia guardado em "reservadoAte", no horário de Brasília.
export const reservaVencida = 'dateTime(reservadoAte + "T23:59:59-03:00") < dateTime(now())'

const formatarPreco = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})

export const itemBazar = defineType({
  name: 'itemBazar',
  title: 'Item do bazar',
  type: 'document',
  // O código continua a sequência dos itens já cadastrados (BZ-001, BZ-002...).
  initialValue: async (_params, {getClient}) => {
    const codigos: string[] = await getClient({apiVersion}).fetch(
      '*[_type == "itemBazar" && defined(codigo)].codigo',
    )
    const maior = Math.max(0, ...codigos.map((codigo) => Number(codigo.replace(/\D/g, '')) || 0))
    return {
      codigo: `BZ-${String(maior + 1).padStart(3, '0')}`,
      quantidade: 1,
      situacao: 'disponivel',
    }
  },
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome do item',
      description: 'Curto e claro. Ex.: Fogão 4 bocas',
      type: 'string',
      validation: (rule) => rule.required().max(80).error('Dê um nome ao item, com até 80 letras.'),
    }),
    defineField({
      name: 'fotos',
      title: 'Fotos',
      description:
        'A primeira é a que aparece na vitrine. Fotografe só o item, sem pessoas, e mostre os defeitos.',
      type: 'array',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
      options: {layout: 'grid'},
      validation: (rule) => rule.required().min(1).max(4).error('Coloque de 1 a 4 fotos.'),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {list: categorias, layout: 'radio'},
      validation: (rule) => rule.required().error('Escolha uma categoria.'),
    }),
    defineField({
      name: 'conservacao',
      title: 'Estado de conservação',
      type: 'string',
      options: {list: conservacoes, layout: 'radio'},
      validation: (rule) => rule.required().error('Diga o estado do item.'),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      description: 'Detalhes que ajudam a decidir: medidas, voltagem, defeitos ou marcas de uso.',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.max(600).error('Use até 600 letras.'),
    }),
    defineField({
      name: 'tamanho',
      title: 'Tamanho',
      description: 'Para roupas e calçados. Ex.: P, M, 6 anos, 38',
      type: 'string',
    }),
    defineField({
      name: 'preco',
      title: 'Preço (R$)',
      description: 'Só o número, sem "R$". Ex.: 5',
      type: 'number',
      validation: (rule) => rule.required().min(0).precision(2).error('Informe o preço.'),
    }),
    defineField({
      name: 'quantidade',
      title: 'Quantidade',
      description:
        'Deixe 1 para peça única. Se houver várias unidades iguais, coloque quantas são e diminua a cada venda. Com 0, o item sai do site.',
      type: 'number',
      validation: (rule) =>
        rule.required().integer().min(0).error('Informe quantas unidades há, sem vírgula.'),
    }),
    defineField({
      name: 'validade',
      title: 'Validade',
      description:
        'Preencha só se o produto tiver prazo de validade. Depois dessa data o item sai do site sozinho.',
      type: 'date',
      options: {dateFormat: 'DD/MM/YYYY'},
    }),
    defineField({
      name: 'codigo',
      title: 'Código',
      description:
        'Gerado sozinho. É o código que aparece no site e no pedido do WhatsApp. Só mude se aparecer o aviso de código repetido (por exemplo, depois de duplicar um item).',
      type: 'string',
      // Duas regras separadas para cada uma mostrar a própria mensagem.
      validation: (rule) => [
        rule
          .required()
          .regex(/^BZ-\d{3,}$/)
          .error('Use o formato BZ-001.'),
        rule.custom(async (codigo, context) => {
          if (!codigo || !context.document) return true
          const id = context.document._id.replace(/^drafts\./, '')
          const repetidos: number = await context
            .getClient({apiVersion})
            .fetch(
              'count(*[_type == "itemBazar" && codigo == $codigo && !(_id in [$id, "drafts." + $id])])',
              {codigo, id},
            )
          return repetidos === 0 || 'Já existe outro item com este código. Troque o número.'
        }),
      ],
    }),
    defineField({
      name: 'situacao',
      title: 'Situação',
      description:
        'Para reservar, use o botão "Reservar" no rodapé. Mude para "Vendido" assim que o item sair. Itens vendidos não aparecem no site.',
      type: 'string',
      options: {list: situacoes, layout: 'radio', direction: 'horizontal'},
      validation: (rule) =>
        rule.required().custom((situacao, context) => {
          if (situacao !== 'reservado') return true
          return (
            context.document?.quantidade === 1 ||
            'Só peças únicas (quantidade 1) podem ser reservadas.'
          )
        }),
    }),
    defineField({
      name: 'reservadoAte',
      title: 'Reservado até',
      description:
        'Último dia da reserva. No dia seguinte o item volta a aparecer como disponível no site e entra na lista "Reservas vencidas".',
      type: 'date',
      options: {dateFormat: 'DD/MM/YYYY'},
      hidden: ({document}) => document?.situacao !== 'reservado',
      validation: (rule) =>
        rule.custom((data, context) =>
          context.document?.situacao === 'reservado' && !data
            ? 'Informe até quando vai a reserva.'
            : true,
        ),
    }),
  ],
  orderings: [
    {title: 'Mais recentes', name: 'maisRecentes', by: [{field: '_createdAt', direction: 'desc'}]},
    {title: 'Código', name: 'codigo', by: [{field: 'codigo', direction: 'asc'}]},
  ],
  preview: {
    select: {
      nome: 'nome',
      codigo: 'codigo',
      preco: 'preco',
      quantidade: 'quantidade',
      situacao: 'situacao',
      foto: 'fotos.0',
    },
    prepare({nome, codigo, preco, quantidade, situacao, foto}) {
      const partes = [
        codigo,
        typeof preco === 'number' ? formatarPreco.format(preco) : null,
        typeof quantidade === 'number' && quantidade !== 1 ? `${quantidade} em estoque` : null,
        situacoes.find((s) => s.value === situacao)?.title,
      ]
      return {title: nome, subtitle: partes.filter(Boolean).join(' · '), media: foto}
    },
  },
})
