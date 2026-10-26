import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '2k4u015k',
    dataset: 'production'
  },
  deployment: {
    // Painel publicado em https://inav.sanity.studio (npm run deploy publica de novo no mesmo endereço).
    appId: 'g06vkij9z2vr48zo2ptjzi2d',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
