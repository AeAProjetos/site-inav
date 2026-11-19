import {defineField, defineType} from 'sanity'

const hoje = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/**
 * Seção "No Instagram" do blog (ideia do usuário, 19/11/2026): só a foto, uma legenda curta e o
 * link do post. Não tem página no site: o clique abre o Instagram. As notícias continuam no
 * documento "Publicação do blog" (post), com os tipos Aviso, Educação infantil e os outros.
 */
export const postInstagram = defineType({
  name: 'postInstagram',
  title: 'Post do Instagram',
  type: 'document',
  initialValue: () => ({publicadoEm: hoje()}),
  fields: [
    defineField({
      name: 'link',
      title: 'Link do post no Instagram',
      description: 'No Instagram, abra o post, toque em ⋯ e em "Copiar link". Cole aqui.',
      type: 'url',
      validation: (rule) =>
        rule
          .required()
          .uri({scheme: ['https']})
          .custom((valor) =>
            !valor || /^https:\/\/(www\.)?instagram\.com\//.test(valor)
              ? true
              : 'Cole um link do Instagram (https://www.instagram.com/...).',
          ),
    }),
    defineField({
      name: 'foto',
      title: 'Foto',
      description: 'A mesma foto do post. Ela só aparece no site com a autorização marcada.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Descrição da foto',
          description: 'Para quem usa leitor de tela. Sem nome de criança.',
          type: 'string',
        }),
        defineField({
          name: 'autorizada',
          title: 'Autorização de uso de imagem confirmada?',
          description:
            'Marque só se as pessoas na foto (ou os responsáveis, no caso de crianças) autorizaram o uso.',
          type: 'boolean',
          initialValue: false,
        }),
      ],
      validation: (rule) =>
        rule.required().custom((valor: {autorizada?: boolean} | undefined) =>
          valor && !valor.autorizada
            ? {message: 'Sem a autorização marcada, este post NÃO aparece no site.', level: 'warning'}
            : true,
        ),
    }),
    defineField({
      name: 'legenda',
      title: 'Legenda curta',
      description: 'Uma frase. Sem nome de criança.',
      type: 'string',
      validation: (rule) => rule.max(140).warning('Use até 140 letras para caber embaixo da foto.'),
    }),
    defineField({
      name: 'publicadoEm',
      title: 'Data do post',
      description: 'O blog mostra os 6 mais recentes.',
      type: 'date',
      options: {dateFormat: 'DD/MM/YYYY'},
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {title: 'Mais recentes primeiro', name: 'recentes', by: [{field: 'publicadoEm', direction: 'desc'}]},
  ],
  preview: {
    select: {legenda: 'legenda', data: 'publicadoEm', media: 'foto', autorizada: 'foto.autorizada'},
    prepare: ({
      legenda,
      data,
      media,
      autorizada,
    }: {
      legenda?: string
      data?: string
      media?: unknown
      autorizada?: boolean
    }) => ({
      title: legenda || 'Sem legenda',
      subtitle: `${data ? data.split('-').reverse().join('/') : 'sem data'}${autorizada ? '' : ' · sem autorização, fora do site'}`,
      media: media as never,
    }),
  },
})
