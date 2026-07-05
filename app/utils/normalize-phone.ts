/**
 * Normalizes a raw phone number string into digits-only form, preserving a
 * single leading "+" for international format. Used across generators
 * (WhatsApp, SMS, Phone) so the same phone field behaves identically.
 */
export function normalizePhone(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed) return ''

  const hasLeadingPlus = trimmed.startsWith('+')
  const digits = trimmed.replace(/\D/g, '')

  return hasLeadingPlus ? `+${digits}` : digits
}
