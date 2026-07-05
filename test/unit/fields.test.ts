import { describe, expect, it } from 'vitest'
import { fieldRegistry, getField } from '../../app/utils/fields'

describe('fieldRegistry', () => {
  it('defines all canonical shared fields', () => {
    const keys = [
      'phone',
      'countryCode',
      'username',
      'email',
      'website',
      'message',
      'subject',
      'body',
      'title',
      'latitude',
      'longitude',
      'address',
    ] as const

    for (const key of keys) {
      expect(fieldRegistry[key]).toBeDefined()
      expect(fieldRegistry[key].key).toBe(key)
    }
  })

  it('getField returns the matching definition', () => {
    expect(getField('email').label).toBe('Email address')
  })
})

describe('phone field validation', () => {
  it('accepts a valid phone number', () => {
    expect(getField('phone').validate('+1 555 123 4567')).toBeNull()
  })

  it('rejects a too-short phone number', () => {
    expect(getField('phone').validate('123')).not.toBeNull()
  })

  it('treats empty as valid (required-ness is enforced separately)', () => {
    expect(getField('phone').validate('')).toBeNull()
  })
})

describe('email field validation', () => {
  it('accepts a valid email', () => {
    expect(getField('email').validate('a@b.com')).toBeNull()
  })

  it('rejects an invalid email', () => {
    expect(getField('email').validate('not-an-email')).not.toBeNull()
  })
})

describe('website field validation', () => {
  it('accepts a bare domain', () => {
    expect(getField('website').validate('example.com')).toBeNull()
  })

  it('rejects garbage input', () => {
    expect(getField('website').validate('   ')).not.toBeNull()
  })
})

describe('latitude/longitude field validation', () => {
  it('accepts values within range', () => {
    expect(getField('latitude').validate('37.7749')).toBeNull()
    expect(getField('longitude').validate('-122.4194')).toBeNull()
  })

  it('rejects values out of range', () => {
    expect(getField('latitude').validate('120')).not.toBeNull()
    expect(getField('longitude').validate('-200')).not.toBeNull()
  })

  it('rejects non-numeric values', () => {
    expect(getField('latitude').validate('abc')).not.toBeNull()
  })
})

describe('username field normalization', () => {
  it('strips a leading @', () => {
    expect(fieldRegistry.username.normalize?.('@johndoe')).toBe('johndoe')
  })
})
