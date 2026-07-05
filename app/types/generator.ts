import type { FieldKey } from './field'

export type LinkType = 'dm' | 'profile' | 'post'

export interface GeneratorFieldRef {
  key: FieldKey
  required: boolean
  /** Overrides the shared field's label/placeholder for this generator, if needed. */
  label?: string
  placeholder?: string
}

export type FieldValues = Partial<Record<FieldKey, string>>

export interface GeneratorConfig {
  id: string
  name: string
  description: string
  /** Nuxt Icon name, e.g. "simple-icons:whatsapp" */
  icon: string
  fields: GeneratorFieldRef[]
  /** Builds the deep link URL from raw (un-normalized) field values. Throws if required fields are missing. */
  generate: (values: FieldValues, type?: LinkType) => string
  /** The template syntax of the link, e.g. `https://wa.me/{phone}?text={message}` */
  formatTemplate?: string
  /** Details about how the link format works and what protocol it follows. */
  formatExplanation?: string
  
  // Custom multi-type mappings for tabs:
  supportedTypes?: LinkType[]
  typeFields?: Partial<Record<LinkType, GeneratorFieldRef[]>>
  typeTemplates?: Partial<Record<LinkType, string>>
  typeExplanations?: Partial<Record<LinkType, string>>
}

export type ValidationErrors = Partial<Record<FieldKey, string>>
