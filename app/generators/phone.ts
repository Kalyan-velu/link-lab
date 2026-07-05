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
}
