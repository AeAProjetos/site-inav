// O tipo de publicação "instagram" saiu em 19/11/2026: os posts do Instagram ganharam um tipo de
// documento próprio ("Post do Instagram"), e as notícias que estavam nele passam para "educacao"
// (Educação infantil). Só o campo "tipo" muda; o resto, inclusive edições feitas no painel, fica.
//
// Uso, na pasta studio (o dataset é obrigatório, para nunca cair em produção por engano):
//   DATASET=development npx sanity exec migracoes/instagram-para-educacao.mjs --with-user-token
// Em "production", só na publicação, com o OK do usuário.
import {getCliClient} from 'sanity/cli'

const dataset = process.env.DATASET
if (dataset !== 'development' && dataset !== 'production') {
  throw new Error('Informe DATASET=development ou DATASET=production.')
}

// "raw" pega também os rascunhos, para nenhum ficar com o tipo antigo.
const client = getCliClient({apiVersion: '2026-10-01'}).withConfig({dataset, perspective: 'raw'})

const ids = await client.fetch(`*[_type == "post" && tipo == "instagram"]._id`)
console.log(`${dataset}: ${ids.length} publicação(ões) com o tipo "instagram".`)
if (ids.length > 0) {
  const transacao = client.transaction()
  for (const id of ids) transacao.patch(id, (p) => p.set({tipo: 'educacao'}))
  await transacao.commit({visibility: 'sync'})
  console.log('Passaram para "educacao" (Educação infantil).')
}
