import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import GeneratorForm from '~/components/generator-form.vue'
import { whatsapp } from '~/generators/whatsapp'

describe('GeneratorForm', () => {
  it('renders one input per field on the generator', async () => {
    const component = await mountSuspended(GeneratorForm, {
      props: { generator: whatsapp, values: {}, errors: {} },
    })
    expect(component.findAll('input, textarea').length).toBe(2)
  })

  it('labels required fields', async () => {
    const component = await mountSuspended(GeneratorForm, {
      props: { generator: whatsapp, values: {}, errors: {} },
    })
    expect(component.text()).toContain('Phone number')
  })

  it('shows a validation error message for a field', async () => {
    const component = await mountSuspended(GeneratorForm, {
      props: { generator: whatsapp, values: {}, errors: { phone: 'Phone number is required.' } },
    })
    expect(component.text()).toContain('Phone number is required.')
  })

  it('emits update:value when a field changes', async () => {
    const component = await mountSuspended(GeneratorForm, {
      props: { generator: whatsapp, values: {}, errors: {} },
    })
    const input = component.find('input')
    await input.setValue('+15551234567')

    const emitted = component.emitted('update:value') as Array<[string, string]> | undefined
    expect(emitted?.at(-1)).toEqual(['phone', '+15551234567'])
  })
})
