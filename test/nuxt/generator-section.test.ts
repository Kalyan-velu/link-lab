import { describe, expect, it, vi, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import GeneratorSection from '~/components/generator-section.vue'

vi.mock('qrcode', () => ({
  default: { toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,fake') },
}))

describe('GeneratorSection', () => {
  beforeEach(() => {
    localStorage.clear()
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
  })

  it('shows an empty state instead of a URL until required fields are valid', async () => {
    const component = await mountSuspended(GeneratorSection)
    expect(component.text()).not.toContain('wa.me')
  })

  it('generates a URL immediately as the user types', async () => {
    const component = await mountSuspended(GeneratorSection)
    const phoneInput = component.find('input[type="tel"]')
    await phoneInput.setValue('+15551234567')

    expect(component.text()).toContain('wa.me/15551234567')
  })

  it('keeps shared field values when switching platforms', async () => {
    const component = await mountSuspended(GeneratorSection)
    await component.find('input[type="tel"]').setValue('+15551234567')

    const telegramButton = component.findAll('[role="radio"]').find((b) => b.text().includes('Telegram'))
    await telegramButton?.trigger('click')

    const phoneInput = component.find('input[type="tel"]')
    expect((phoneInput.element as HTMLInputElement).value).toBe('+15551234567')
  })

  it('reset clears message but keeps phone number', async () => {
    const component = await mountSuspended(GeneratorSection)
    await component.find('input[type="tel"]').setValue('+15551234567')
    await component.find('textarea').setValue('Hello there')

    const resetButton = component.findAll('button').find((b) => b.text().includes('Reset'))
    await resetButton?.trigger('click')

    expect((component.find('input[type="tel"]').element as HTMLInputElement).value).toBe('+15551234567')
    expect((component.find('textarea').element as HTMLTextAreaElement).value).toBe('')
  })
})
