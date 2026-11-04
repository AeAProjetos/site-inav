import {defineConfig, type WorkspaceOptions} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {ptBRLocale} from '@sanity/locale-pt-br'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {acoesDoBazar} from './reserva'

const emDesenvolvimento = process.env.NODE_ENV === 'development'

const producao: WorkspaceOptions = {
  name: 'default',
  title: 'INAV',
  basePath: '/',

  projectId: '2k4u015k',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    ptBRLocale(),
    // A ferramenta de consultas só aparece em desenvolvimento; a equipe do INAV não precisa dela.
    ...(emDesenvolvimento ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: acoesDoBazar,
  },
}

// Itens de exemplo ficam no dataset "development", que o site no ar não lê. Esse espaço só existe
// rodando o painel na própria máquina (npm run dev), para a equipe do INAV nunca cadastrar nele por engano.
const testes: WorkspaceOptions = {
  ...producao,
  name: 'testes',
  title: 'INAV · Testes',
  basePath: '/testes',
  dataset: 'development',
}

export default defineConfig(
  emDesenvolvimento ? [{...producao, basePath: '/producao'}, testes] : producao,
)
