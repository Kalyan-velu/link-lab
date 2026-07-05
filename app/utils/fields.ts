import type { FieldDefinition, FieldKey } from '~/types/field'
import { normalizePhone } from './normalize-phone'
import { normalizeUrl } from './normalize-url'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^\+?\d{6,15}$/
const COUNTRY_CODE_PATTERN = /^\+?\d{1,4}$/

/**
 * Canonical field definitions shared across every generator. Generators
 * reference these by key instead of declaring their own copies, so values
 * (and validation rules) persist when a user switches platforms.
 */
export const fieldRegistry: Record<FieldKey, FieldDefinition> = {
  phone: {
    key: 'phone',
    label: 'Phone number',
    type: 'tel',
    placeholder: '+1 555 123 4567',
    autocomplete: 'tel',
    normalize: normalizePhone,
    validate: (value) => {
      if (!value) return null
      return PHONE_PATTERN.test(normalizePhone(value)) ? null : 'Enter a valid phone number, digits only.'
    },
  },
  countryCode: {
    key: 'countryCode',
    label: 'Country code',
    type: 'text',
    placeholder: '+1',
    normalize: normalizePhone,
    validate: (value) => {
      if (!value) return null
      return COUNTRY_CODE_PATTERN.test(normalizePhone(value)) ? null : 'Enter a valid country code, e.g. +1.'
    },
  },
  username: {
    key: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'username',
    normalize: (value) => value.trim().replace(/^@/, ''),
    validate: (value) => {
      if (!value) return null
      return /^[a-zA-Z0-9._-]{1,50}$/.test(value.trim().replace(/^@/, ''))
        ? null
        : 'Usernames can only contain letters, numbers, dots, dashes, and underscores.'
    },
  },
  email: {
    key: 'email',
    label: 'Email address',
    type: 'email',
    placeholder: 'name@example.com',
    autocomplete: 'email',
    normalize: (value) => value.trim(),
    validate: (value) => {
      if (!value) return null
      return EMAIL_PATTERN.test(value.trim()) ? null : 'Enter a valid email address.'
    },
  },
  website: {
    key: 'website',
    label: 'Website',
    type: 'url',
    placeholder: 'example.com',
    normalize: normalizeUrl,
    validate: (value) => {
      if (!value) return null
      try {
        // eslint-disable-next-line no-new
        new URL(normalizeUrl(value))
        return null
      } catch {
        return 'Enter a valid website address.'
      }
    },
  },
  message: {
    key: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Type your message…',
    validate: () => null,
  },
  subject: {
    key: 'subject',
    label: 'Subject',
    type: 'text',
    placeholder: 'Email subject',
    validate: () => null,
  },
  body: {
    key: 'body',
    label: 'Body',
    type: 'textarea',
    placeholder: 'Email body',
    validate: () => null,
  },
  title: {
    key: 'title',
    label: 'Title',
    type: 'text',
    placeholder: 'Location or page title',
    validate: () => null,
  },
  latitude: {
    key: 'latitude',
    label: 'Latitude',
    type: 'number',
    placeholder: '37.7749',
    validate: (value) => {
      if (!value) return null
      const n = Number(value)
      return Number.isFinite(n) && n >= -90 && n <= 90 ? null : 'Latitude must be between -90 and 90.'
    },
  },
  longitude: {
    key: 'longitude',
    label: 'Longitude',
    type: 'number',
    placeholder: '-122.4194',
    validate: (value) => {
      if (!value) return null
      const n = Number(value)
      return Number.isFinite(n) && n >= -180 && n <= 180 ? null : 'Longitude must be between -180 and 180.'
    },
  },
  address: {
    key: 'address',
    label: 'Address',
    type: 'text',
    placeholder: '1600 Amphitheatre Parkway, Mountain View, CA',
    validate: () => null,
  },
}

export function getField(key: FieldKey): FieldDefinition {
  return fieldRegistry[key]
}
