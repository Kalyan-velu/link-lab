import { describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import QRCodePreview from '~/components/qr-code-preview.vue'

vi.mock('qrcode', () => ({
  default: {
    toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,fake'),
  },
}))

describe('QRCodePreview', () => {
  it('renders nothing meaningful when there is no value', async () => {
    const component = await mountSuspended(QRCodePreview, { props: { value: '' } })
    expect(component.find('img').exists()).toBe(false)
  })

  it('renders a QR code image once a value is provided', async () => {
    const component = await mountSuspended(QRCodePreview, { props: { value: 'https://wa.me/15551234567' } })
    await new Promise((resolve) => setTimeout(resolve, 0))

    const img = component.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('data:image/png;base64,fake')
  })

  it('exposes a download link with a png filename', async () => {
    const component = await mountSuspended(QRCodePreview, { props: { value: 'https://wa.me/15551234567' } })
    await new Promise((resolve) => setTimeout(resolve, 0))

    const link = component.find('a[download]')
    expect(link.exists()).toBe(true)
    expect(link.attributes('download')).toMatch(/\.png$/)
  })
})
