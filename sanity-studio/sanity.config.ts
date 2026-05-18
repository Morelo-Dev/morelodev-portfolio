import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Blog morelodev.com',

  projectId: 'uht0sj7a',
  dataset: 'production',
  // @ts-expect-error deployment config
  deployment: {appId: 'hq05l1t5i3qrnm23wnbpn44x'},

  plugins: [structureTool(), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
})
