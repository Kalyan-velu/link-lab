export type FieldKey =
  | 'phone'
  | 'countryCode'
  | 'username'
  | 'email'
  | 'website'
  | 'message'
  | 'subject'
  | 'body'
  | 'title'
  | 'latitude'
  | 'longitude'
  | 'address'

export type FieldInputType = 'text' | 'tel' | 'email' | 'url' | 'textarea' | 'number'

export interface FieldDefinition {
  key: FieldKey
  label: string
  type: FieldInputType
  placeholder?: string
  autocomplete?: string
  /** Returns an error message, or null when the value is valid. */
  validate: (value: string) => string | null
  /** Normalizes raw user input before it is stored or used to build a URL. */
  normalize?: (value: string) => string
}
