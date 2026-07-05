import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PlatformSelector from '~/components/platform-selector.vue'
import { generators } from '~/generators'

describe('PlatformSelector', () => {
  it('renders one link per generator', async () => {
    const component = await mountSuspended(PlatformSelector, { props: { currentId: 'whatsapp' } })
    const links = component.findAll('a')
    expect(links.length).toBe(generators.length)
  })

  it('links each generator to its own page', async () => {
    const component = await mountSuspended(PlatformSelector, { props: { currentId: 'whatsapp' } })
    const links = component.findAll('a')
    const smsLink = links.find((l) => l.text().includes('SMS'))
    expect(smsLink?.attributes('href')).toBe('/generators/sms')
  })

  it('marks the current generator with aria-current', async () => {
    const component = await mountSuspended(PlatformSelector, { props: { currentId: 'telegram' } })
    const current = component.findAll('a[aria-current="page"]')
    expect(current.length).toBe(1)
    expect(current[0]?.text()).toContain('Telegram')
  })
})
