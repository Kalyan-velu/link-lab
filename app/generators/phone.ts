import type { GeneratorConfig } from '~/types/generator'
import { normalizePhone } from '~/utils/normalize-phone'

export const phone: GeneratorConfig = {
  id: 'phone',
  name: 'Phone Call',
  description: 'Start a phone call directly.',
  icon: 'lucide:phone',
  fields: [{ key: 'phone', required: true }],
  generate: (values) => {
    const value = normalizePhone(values.phone ?? '')
    return `tel:${value}`
  },
  formatTemplate: 'tel:{phone}',
  formatExplanation: 'The tel protocol scheme triggers the device\'s native dialer to place a voice call. It is widely supported across mobile operating systems (iOS and Android) and desktop clients that support cellular calling (like FaceTime on macOS).',
}
