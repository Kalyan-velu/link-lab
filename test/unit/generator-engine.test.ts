import { describe, expect, it } from 'vitest'
import { tryGenerate, validateGenerator } from '../../app/utils/generator-engine'
import { whatsapp } from '../../app/generators/whatsapp'
import { googleMaps } from '../../app/generators/google-maps'

describe('validateGenerator', () => {
  it('flags missing required fields', () => {
    const errors = validateGenerator(whatsapp, {})
    expect(errors.phone).toBeTruthy()
  })

  it('flags invalid format for a provided field', () => {
    const errors = validateGenerator(whatsapp, { phone: '123' })
    expect(errors.phone).toBeTruthy()
  })

  it('returns no errors for valid required + optional fields', () => {
    const errors = validateGenerator(whatsapp, { phone: '+15551234567', message: 'hi' })
    expect(errors).toEqual({})
  })

  it('does not require optional fields', () => {
    const errors = validateGenerator(whatsapp, { phone: '+15551234567' })
    expect(errors).toEqual({})
  })
})

describe('tryGenerate', () => {
  it('returns a url when values are valid', () => {
    const result = tryGenerate(whatsapp, { phone: '+15551234567' })
    expect(result.url).toBe('https://wa.me/15551234567')
    expect(result.errors).toEqual({})
  })

  it('returns errors instead of a url when required fields are missing', () => {
    const result = tryGenerate(whatsapp, {})
    expect(result.url).toBeNull()
    expect(result.errors.phone).toBeTruthy()
  })

  it('surfaces errors thrown from generate() as validation errors', () => {
    const result = tryGenerate(googleMaps, {})
    expect(result.url).toBeNull()
    expect(Object.keys(result.errors).length).toBeGreaterThan(0)
  })
})
