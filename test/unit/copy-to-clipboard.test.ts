import { afterEach, describe, expect, it, vi } from 'vitest'
import { copyToClipboard } from '../../app/utils/copy-to-clipboard'

describe('copyToClipboard', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('writes text via the async Clipboard API when available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })

    const result = await copyToClipboard('hello world')

    expect(writeText).toHaveBeenCalledWith('hello world')
    expect(result).toBe(true)
  })

  it('returns false and does not throw when the Clipboard API is unavailable', async () => {
    vi.stubGlobal('navigator', {})
    vi.stubGlobal('document', undefined)

    const result = await copyToClipboard('hello world')

    expect(result).toBe(false)
  })

  it('returns false when the Clipboard API rejects', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'))
    vi.stubGlobal('navigator', { clipboard: { writeText } })

    const result = await copyToClipboard('hello world')

    expect(result).toBe(false)
  })
})
