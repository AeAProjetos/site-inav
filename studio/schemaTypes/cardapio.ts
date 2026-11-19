import {defineArrayMember, defineField, defineType} from 'sanity'

// As 5 refeições e os horários fixos ficam no site (src/lib/blog.ts). Aqui entram só os itens.
const refeicoes = [
  {name: 'cafe', title: 'Café da manhã'},
  {name: 'colacao', title: 'Colação'},
  {name: 'almoco', title: 'Almoço'},
  {name: 'lanche', title: 'Lanche'},
  {name: 'jantar', title: 'Jantar'},
]

const dataCurta = (iso?: string) => (iso ? iso.split('-').reverse().slice(0, 2).join('/') : '?')

export const cardapio = defineType({
  name: 'cardapio',
  title: 'Cardápio da semana',
  type: 'document',
  fields: [
    defineField({
      name: 'inicio',
      title: 'Segunda-feira da semana',
      description: 'O blog mostra a semana atual e a anterior, e abre no dia de hoje.',
      type: 'date',
      options: {dateFormat: 'DD/MM/YYYY'},
      validation: (rule) => rule.required().error('Informe a segunda-feira da semana.'),
    }),
    defineField({
      name: 'fim',
      title: 'Sexta-feira da semana',
      type: 'date',
      options: {dateFormat: 'DD/MM/YYYY'},
      validation: (rule) => rule.required().error('Informe a sexta-feira da semana.'),
    }),
    defineField({
      name: 'dias',
      title: 'Dias',
      description: 'Um por dia, de segunda a sexta.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'dia',
          fields: [
            defineField({
              name: 'data',
              title: 'Data',
              type: 'date',
              options: {dateFormat: 'DD/MM/YYYY'},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'feriado',
              title: 'Feriado ou dia sem aula?',
              description: 'Marcado, o blog mostra um aviso no lugar das refeições.',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'motivo',
              title: 'Aviso do feriado',
              description: 'Ex.: Feriado do Dia da Consciência Negra.',
              type: 'string',
              hidden: ({parent}) => !parent?.feriado,
            }),
            ...refeicoes.map((r) =>
              defineField({
                name: r.name,
                title: r.title,
                description: 'Um item por linha.',
                type: 'text',
                rows: 3,
                hidden: ({parent}) => Boolean(parent?.feriado),
              }),
            ),
          ],
          preview: {
            select: {data: 'data', feriado: 'feriado', almoco: 'almoco'},
            prepare: ({data, feriado, almoco}: {data?: string; feriado?: boolean; almoco?: string}) => ({
              title: dataCurta(data),
              subtitle: feriado ? 'Feriado' : (almoco ?? '').split('\n')[0],
            }),
          },
        }),
      ],
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: 'fotos',
      title: 'Fotos das turmas (carrossel)',
      description:
        'Aparecem ao lado do cardápio. Se esta semana não tiver fotos, o blog usa as da semana anterior.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'legenda', title: 'Legenda curta', type: 'string'}),
            defineField({
              name: 'alt',
              title: 'Descrição da foto',
              description: 'Para quem usa leitor de tela. Sem nome de criança.',
              type: 'string',
            }),
            defineField({
              name: 'autorizada',
              title: 'Autorização de uso de imagem confirmada?',
              description: 'Sem isso, a foto não aparece no site.',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'fonteUrl',
      title: 'Link do cardápio no Instagram',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
  ],
  orderings: [
    {title: 'Mais recentes primeiro', name: 'recentes', by: [{field: 'inicio', direction: 'desc'}]},
  ],
  preview: {
    select: {inicio: 'inicio', fim: 'fim', media: 'fotos.0'},
    prepare: ({inicio, fim, media}: {inicio?: string; fim?: string; media?: unknown}) => ({
      title: `Semana de ${dataCurta(inicio)} a ${dataCurta(fim)}`,
      media: media as never,
    }),
  },
})
