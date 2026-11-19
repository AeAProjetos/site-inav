import {defineField, defineType} from 'sanity'

// Mesmos valores do selo da página Projetos do site (src/components/projetos/SeloStatus.tsx).
const situacoes = [
  {title: 'Aprovado', value: 'aprovado'},
  {title: 'Em execução', value: 'em-execucao'},
]

export const projeto = defineType({
  name: 'projeto',
  title: 'Projeto do ano',
  type: 'document',
  description: 'Aparece na seção "Projetos em <ano>" do blog.',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome do projeto',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'parceiro',
      title: 'Parceiro',
      description: 'Ex.: VEPEMA · TJDFT',
      type: 'string',
    }),
    defineField({
      name: 'situacao',
      title: 'Situação',
      type: 'string',
      options: {list: situacoes, layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destaque',
      title: 'Número em destaque',
      description: 'Valor ou andamento. Ex.: R$ 88.796,67 ou 3 de 5 palestras.',
      type: 'string',
    }),
    defineField({
      name: 'texto',
      title: 'Texto curto',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(220).warning('Até 220 letras para caber no card.'),
    }),
    defineField({
      name: 'ano',
      title: 'Ano',
      description: 'O blog mostra os projetos do ano atual.',
      type: 'number',
      initialValue: () => new Date().getFullYear(),
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: 'ordem',
      title: 'Ordem na seção',
      description: 'Menor primeiro.',
      type: 'number',
      initialValue: 1,
    }),
  ],
  orderings: [{title: 'Ordem', name: 'ordem', by: [{field: 'ordem', direction: 'asc'}]}],
  preview: {
    select: {title: 'nome', ano: 'ano', situacao: 'situacao'},
    prepare: ({title, ano, situacao}: {title?: string; ano?: number; situacao?: string}) => ({
      title: title ?? 'Sem nome',
      subtitle: `${ano ?? ''} · ${situacoes.find((s) => s.value === situacao)?.title ?? 'sem situação'}`,
    }),
  },
})
