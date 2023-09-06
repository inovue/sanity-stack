import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import settings from './settings'
import post from './post'
import siteMeta from './siteMeta'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, siteMeta, settings],
}
