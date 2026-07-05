/**
 * Normalizes a raw URL/handle string into an absolute URL by defaulting to
 * https:// when no protocol is present and stripping a leading "@" that
 * users commonly paste from social handles.
 */
export function normalizeUrl(raw: string): string {
  let trimmed = raw.trim()
  if (!trimmed) return ''

  if (trimmed.startsWith('@')) {
    trimmed = trimmed.slice(1)
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  return `https://${trimmed}`
}
