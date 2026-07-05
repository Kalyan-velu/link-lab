import { describe, expect, it, vi, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CopyButton from '~/components/copy-button.vue'

describe('CopyButton', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    })
  })

  it('renders a "Copy" label by default', async () => {
    const component = await mountSuspended(CopyButton, { props: { text: 'https://wa.me/15551234567' } })
    expect(component.text()).toContain('Copy')
  })

  it('copies the given text and shows a "Copied" state', async () => {
    const component = await mountSuspended(CopyButton, { props: { text: 'https://wa.me/15551234567' } })
    await component.find('button').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('https://wa.me/15551234567')
    expect(component.text()).toContain('Copied')
  })

  it('disables the button when there is no text', async () => {
    const component = await mountSuspended(CopyButton, { props: { text: '' } })
    expect(component.find('button').attributes('disabled')).toBeDefined()
  })
})
