import {beforeEach, describe, expect, it, vi} from 'vitest'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import GeneratorSection from '~/components/generator-section.vue'

vi.mock('qrcode', () => ({
  default: { toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,fake') },
}))

describe('GeneratorSection', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  it('shows an empty state instead of a URL until required fields are valid', async () => {
    const component = await mountSuspended(GeneratorSection, { props: { generatorId: 'whatsapp' } })
    expect(component.text()).toContain('Your link will appear here')
  })

  it('generates a URL immediately as the user types', async () => {
    const component = await mountSuspended(GeneratorSection, { props: { generatorId: 'whatsapp' } })
    const phoneInput = component.find('input[type="tel"]')
    await phoneInput.setValue('+15551234567')

    expect(component.text()).toContain('wa.me/15551234567')
  })

  it('keeps shared field values when the generator id changes (e.g. navigating WhatsApp -> Telegram)', async () => {
    const component = await mountSuspended(GeneratorSection, { props: { generatorId: 'whatsapp' } })
    await component.find('textarea').setValue('Hello there')

    await component.setProps({ generatorId: 'telegram' })

    const textarea = component.find('textarea')
    expect((textarea.element as HTMLTextAreaElement).value).toBe('Hello there')
  })

  it('reset clears message but keeps phone number', async () => {
    const component = await mountSuspended(GeneratorSection, { props: { generatorId: 'whatsapp' } })
    await component.find('input[type="tel"]').setValue('+15551234567')
    await component.find('textarea').setValue('Hello there')

    const resetButton = component.findAll('button').find((b) => b.text().includes('Reset'))
    await resetButton?.trigger('click')

    expect((component.find('input[type="tel"]').element as HTMLInputElement).value).toBe('+15551234567')
    expect((component.find('textarea').element as HTMLTextAreaElement).value).toBe('')
  })
})
