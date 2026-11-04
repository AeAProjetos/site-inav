import {defineArrayMember, defineField, defineType} from 'sanity'

// Para mudar os tipos, edite esta lista e a mesma lista em src/lib/blog.ts do site.
// O "value" é o que o site usa; não mude o de um tipo que já tem publicações.
export const tiposDePost = [
  {title: 'Aviso', value: 'aviso'},
  {title: 'Campanha', value: 'campanha'},
  {title: 'Instagram', value: 'instagram'},
  {title: 'Marco institucional', value: 'marco'},
  {title: 'História de transformação', value: 'historia'},
  {title: 'Parceiro em destaque', value: 'parceiro'},
]

// "Reunião de pais: 12/11!" vira "reuniao-de-pais-12-11".
const gerarEndereco = (titulo: string) =>
  titulo
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/, '')

export const post = defineType({
  name: 'post',
  title: 'Publicação do blog',
  type: 'document',
  initialValue: () => ({publicadoEm: new Date().toISOString(), enviarNewsletter: true}),
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      description: 'Claro e curto. Aparece no card e no alto da página.',
      type: 'string',
      validation: (rule) => rule.required().max(110).error('Dê um título, com até 110 letras.'),
    }),
    defineField({
      name: 'slug',
      title: 'Endereço da página',
      description:
        'Clique em "Gerar" depois de escrever o título. Vira o endereço: inav.org.br/blog/este-texto. Não mude depois de publicar, senão os links já compartilhados deixam de funcionar.',
      type: 'slug',
      options: {source: 'titulo', maxLength: 80, slugify: gerarEndereco},
      validation: (rule) =>
        rule
          .required()
          .custom((valor) =>
            !valor?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(valor.current)
              ? true
              : 'Use só letras minúsculas sem acento, números e hífen. Clique em "Gerar".',
          ),
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo',
      description: 'Aparece como selo colorido no card e serve de filtro na página do blog.',
      type: 'string',
      options: {list: tiposDePost, layout: 'radio'},
      validation: (rule) => rule.required().error('Escolha o tipo da publicação.'),
    }),
    defineField({
      name: 'resumo',
      title: 'Resumo',
      description: 'Uma ou duas frases. Aparece no card e na prévia do link no WhatsApp.',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule.required().max(240).error('Escreva um resumo, com até 240 letras.'),
    }),
    defineField({
      name: 'publicadoEm',
      title: 'Publicado em',
      description:
        'A publicação só aparece no site a partir desta data e hora. Para agendar, coloque uma data futura.',
      type: 'datetime',
      options: {timeStep: 15},
      validation: (rule) => rule.required().error('Informe a data de publicação.'),
    }),
    defineField({
      name: 'enviarNewsletter',
      title: 'Enviar por e-mail aos inscritos da newsletter',
      description:
        'Marcado, os inscritos recebem um e-mail com o resumo e o link assim que esta publicação for publicada pela primeira vez. Se a data for futura, o e-mail sai nessa data. O e-mail sai uma vez só: editar depois não reenvia, e mudar a data depois de publicar não muda o envio.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'capa',
      title: 'Foto de capa',
      description:
        'Opcional. A foto só aparece no site com a autorização de uso de imagem marcada abaixo.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Descrição da foto',
          description: 'Para quem usa leitor de tela. Ex.: Crianças pintando na sala de artes.',
          type: 'string',
        }),
        defineField({name: 'legenda', title: 'Legenda', type: 'string'}),
        defineField({name: 'credito', title: 'Quem tirou a foto', type: 'string'}),
        defineField({
          name: 'autorizada',
          title: 'Autorização de uso de imagem confirmada?',
          description:
            'Marque só se as pessoas na foto (ou os responsáveis, no caso de crianças) autorizaram o uso. Sem isso, a publicação sai sem a foto.',
          type: 'boolean',
          initialValue: false,
        }),
      ],
      validation: (rule) =>
        rule.custom((valor: {asset?: unknown; autorizada?: boolean} | undefined) =>
          valor?.asset && !valor.autorizada
            ? {
                message:
                  'Sem a autorização de uso de imagem marcada, esta foto NÃO aparece no site. A publicação sai sem capa.',
                level: 'warning',
              }
            : true,
        ),
    }),
    defineField({
      name: 'corpo',
      title: 'Texto',
      description: 'O texto completo da publicação.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Texto', value: 'normal'},
            {title: 'Título de seção', value: 'h2'},
            {title: 'Subtítulo', value: 'h3'},
            {title: 'Citação', value: 'blockquote'},
          ],
          lists: [
            {title: 'Lista com marcadores', value: 'bullet'},
            {title: 'Lista numerada', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Negrito', value: 'strong'},
              {title: 'Itálico', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'Endereço',
                    type: 'url',
                    validation: (rule) =>
                      rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}).required(),
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'video',
      title: 'Vídeo (link do YouTube)',
      description:
        'Opcional. Suba o vídeo no YouTube e cole o link aqui. Não envie o arquivo de vídeo para o painel.',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'linkOriginal',
      title: 'Link da publicação original',
      description: 'Opcional. Para posts do Instagram ou reportagens: cole o link original.',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
  ],
  orderings: [
    {
      title: 'Mais recentes primeiro',
      name: 'recentes',
      by: [{field: 'publicadoEm', direction: 'desc'}],
    },
  ],
  preview: {
    select: {titulo: 'titulo', tipo: 'tipo', data: 'publicadoEm', media: 'capa'},
    prepare({titulo, tipo, data, media}) {
      const nomeDoTipo = tiposDePost.find((t) => t.value === tipo)?.title ?? 'Sem tipo'
      const dia = data ? new Date(data).toLocaleDateString('pt-BR') : 'sem data'
      return {title: titulo ?? 'Sem título', subtitle: `${nomeDoTipo} · ${dia}`, media}
    },
  },
})
