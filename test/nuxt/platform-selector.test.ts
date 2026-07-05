import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PlatformSelector from '~/components/platform-selector.vue'
import { generators } from '~/generators'

describe('PlatformSelector', () => {
  it('renders one option per generator', async () => {
    const component = await mountSuspended(PlatformSelector, { props: { modelValue: 'whatsapp' } })
    const buttons = component.findAll('[role="radio"]')
    expect(buttons.length).toBe(generators.length)
  })

  it('marks the selected generator as checked', async () => {
    const component = await mountSuspended(PlatformSelector, { props: { modelValue: 'telegram' } })
    const checked = component.findAll('[role="radio"][aria-checked="true"]')
    expect(checked.length).toBe(1)
    expect(checked[0]?.text()).toContain('Telegram')
  })

  it('emits update:modelValue when a platform is clicked', async () => {
    const component = await mountSuspended(PlatformSelector, { props: { modelValue: 'whatsapp' } })
    const buttons = component.findAll('[role="radio"]')
    const smsButton = buttons.find((b) => b.text().includes('SMS'))
    await smsButton?.trigger('click')

    expect(component.emitted('update:modelValue')?.[0]).toEqual(['sms'])
  })
})
