import type {StructureBuilder, StructureResolver} from 'sanity/structure'

const listaDoBazar = (S: StructureBuilder, titulo: string, situacao: string) =>
  S.listItem()
    .title(titulo)
    .child(
      S.documentList()
        .title(titulo)
        .schemaType('itemBazar')
        .apiVersion('2026-10-01')
        .filter('_type == "itemBazar" && situacao == $situacao')
        .params({situacao})
        .defaultOrdering([{field: '_createdAt', direction: 'desc'}]),
    )

// Menu lateral do painel. O blog entra aqui como outro grupo quando for criado.
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
              listaDoBazar(S, 'Disponíveis', 'disponivel'),
              listaDoBazar(S, 'Reservados', 'reservado'),
              listaDoBazar(S, 'Vendidos', 'vendido'),
              S.divider(),
              S.documentTypeListItem('itemBazar').title('Todos os itens'),
            ]),
        ),
    ])
