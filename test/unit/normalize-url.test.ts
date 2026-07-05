import { describe, expect, it } from 'vitest'
import { normalizeUrl } from '../../app/utils/normalize-url'

describe('normalizeUrl', () => {
  it('adds https:// when no protocol is present', () => {
    expect(normalizeUrl('example.com')).toBe('https://example.com')
  })

  it('leaves an existing https:// protocol untouched', () => {
    expect(normalizeUrl('https://example.com')).toBe('https://example.com')
  })

  it('leaves an existing http:// protocol untouched', () => {
    expect(normalizeUrl('http://example.com')).toBe('http://example.com')
  })

  it('trims whitespace', () => {
    expect(normalizeUrl('  example.com  ')).toBe('https://example.com')
  })

  it('strips leading @ symbols commonly pasted from social handles', () => {
    expect(normalizeUrl('@example.com')).toBe('https://example.com')
  })

  it('returns an empty string for empty input', () => {
    expect(normalizeUrl('')).toBe('')
  })
})
