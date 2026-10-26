import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {ptBRLocale} from '@sanity/locale-pt-br'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'INAV',

  projectId: '2k4u015k',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    ptBRLocale(),
    // A ferramenta de consultas só aparece em desenvolvimento; a equipe do INAV não precisa dela.
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
  },
})
