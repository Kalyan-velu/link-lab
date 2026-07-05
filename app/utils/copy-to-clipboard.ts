/**
 * Copies text to the clipboard using the async Clipboard API. Returns false
 * instead of throwing when the API is unavailable or the write is rejected
 * (e.g. missing permissions), so callers can show a fallback UI state.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return false
    }

    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
