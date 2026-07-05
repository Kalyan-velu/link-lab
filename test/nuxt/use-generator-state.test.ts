import {describe, expect, it} from 'vitest'
import {useGeneratorState} from '../../app/composables/use-generator-state'

describe('useGeneratorState', () => {
  it('defaults to the first generator', () => {
    const { selectedId } = useGeneratorState()
    expect(selectedId.value).toBe('whatsapp')
  })

  it('accepts an initial generator id', () => {
    const { selectedId } = useGeneratorState('telegram')
    expect(selectedId.value).toBe('telegram')
  })

  it('preserves shared field values when switching generators (WhatsApp -> Telegram keeps phone and message)', () => {
    const state = useGeneratorState()
    state.selectGenerator('whatsapp')
    state.setValue('phone', '+15551234567')
    state.setValue('message', 'Hello')

    state.selectGenerator('telegram')

    expect(state.values.phone).toBe('+15551234567')
    expect(state.values.message).toBe('Hello')
  })

  it('does not share field values between separate instances', () => {
    const a = useGeneratorState()
    a.setValue('email', 'a@b.com')

    const b = useGeneratorState()
    expect(b.values.email).toBeUndefined()
  })

  it('resetCurrent clears only content fields used by the current generator, keeping global fields', () => {
    const state = useGeneratorState()
    state.selectGenerator('whatsapp')
    state.setValue('phone', '+15551234567')
    state.setValue('message', 'Hello')

    state.resetCurrent()

    expect(state.values.phone).toBe('+15551234567')
    expect(state.values.message).toBeUndefined()
  })

  it('resetCurrent does not clear content fields belonging to other generators', () => {
    const state = useGeneratorState()
    state.selectGenerator('email')
    state.setValue('subject', 'Hi')
    state.setValue('body', 'Body text')

    state.selectGenerator('whatsapp')
    state.setValue('message', 'Hello')
    state.resetCurrent()

    expect(state.values.message).toBeUndefined()
    expect(state.values.subject).toBe('Hi')
    expect(state.values.body).toBe('Body text')
  })
})
