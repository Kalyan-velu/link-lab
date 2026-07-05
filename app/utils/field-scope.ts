import type { FieldKey } from '~/types/field'

/**
 * "Global" fields describe who/where the user is (phone, handle, location)
 * and persist across both platform switches AND the Reset button.
 * "Content" fields hold what the user is sending for a single generation
 * (message text, subject, etc.) and are cleared by Reset, even though they
 * still persist when merely switching platforms.
 */
export const GLOBAL_FIELD_KEYS: FieldKey[] = [
  'phone',
  'countryCode',
  'username',
  'email',
  'website',
  'address',
  'latitude',
  'longitude',
]

export const CONTENT_FIELD_KEYS: FieldKey[] = ['message', 'subject', 'body', 'title']

export function isGlobalField(key: FieldKey): boolean {
  return GLOBAL_FIELD_KEYS.includes(key)
}
