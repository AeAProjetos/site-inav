import {defineArrayMember, defineField, defineType} from 'sanity'

// Para mudar as categorias, edite esta lista. O "value" é o que o site usa; não mude o de uma categoria que já tem itens.
export const categorias = [
  {title: 'Roupas', value: 'roupas'},
  {title: 'Calçados', value: 'calcados'},
  {title: 'Higiene e beleza', value: 'higiene-beleza'},
  {title: 'Casa', value: 'casa'},
  {title: 'Brinquedos e livros', value: 'brinquedos-livros'},
  {title: 'Outros', value: 'outros'},
]

export const situacoes = [
  {title: 'Disponível', value: 'disponivel'},
  {title: 'Reservado', value: 'reservado'},
  {title: 'Vendido', value: 'vendido'},
]

const formatarPreco = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})

export const itemBazar = defineType({
  name: 'itemBazar',
  title: 'Item do bazar',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome do item',
      description: 'Curto e claro. Ex.: Blusa infantil de manga longa',
      type: 'string',
      validation: (rule) => rule.required().max(80).error('Dê um nome ao item, com até 80 letras.'),
    }),
    defineField({
      name: 'fotos',
      title: 'Fotos',
      description: 'A primeira é a que aparece na vitrine. Fotografe só o item, sem pessoas.',
      type: 'array',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
      options: {layout: 'grid'},
      validation: (rule) => rule.required().min(1).max(6).error('Coloque de 1 a 6 fotos.'),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {list: categorias, layout: 'radio'},
      validation: (rule) => rule.required().error('Escolha uma categoria.'),
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
      name: 'validade',
      title: 'Validade',
      description:
        'Preencha só se o produto tiver prazo de validade. Depois dessa data o item sai do site sozinho.',
      type: 'date',
      options: {dateFormat: 'DD/MM/YYYY'},
    }),
    defineField({
      name: 'situacao',
      title: 'Situação',
      description:
        'Mude para "Vendido" assim que o item sair. Itens vendidos não aparecem no site.',
      type: 'string',
      options: {list: situacoes, layout: 'radio', direction: 'horizontal'},
      initialValue: 'disponivel',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {title: 'Mais recentes', name: 'maisRecentes', by: [{field: '_createdAt', direction: 'desc'}]},
  ],
  preview: {
    select: {nome: 'nome', preco: 'preco', situacao: 'situacao', foto: 'fotos.0'},
    prepare({nome, preco, situacao, foto}) {
      const partes = [
        typeof preco === 'number' ? formatarPreco.format(preco) : null,
        situacoes.find((s) => s.value === situacao)?.title,
      ]
      return {title: nome, subtitle: partes.filter(Boolean).join(' · '), media: foto}
    },
  },
})
