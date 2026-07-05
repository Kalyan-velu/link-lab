import { describe, expect, it } from 'vitest'
import { normalizePhone } from '../../app/utils/normalize-phone'

describe('normalizePhone', () => {
  it('strips spaces, dashes, and parentheses', () => {
    expect(normalizePhone('(123) 456-7890')).toBe('1234567890')
  })

  it('keeps a leading plus sign', () => {
    expect(normalizePhone('+1 234 567 8900')).toBe('+12345678900')
  })

  it('strips non-leading plus signs', () => {
    expect(normalizePhone('12+34+56')).toBe('123456')
  })

  it('strips letters and other non-numeric characters', () => {
    expect(normalizePhone('call: 123-abc-456')).toBe('123456')
  })

  it('returns an empty string for empty input', () => {
    expect(normalizePhone('')).toBe('')
  })

  it('trims whitespace before normalizing', () => {
    expect(normalizePhone('  +91 98765 43210  ')).toBe('+919876543210')
  })
})
