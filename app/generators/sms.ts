import type { GeneratorConfig } from '~/types/generator'
import { normalizePhone } from '~/utils/normalize-phone'

export const sms: GeneratorConfig = {
  id: 'sms',
  name: 'SMS',
  description: 'Open the default messaging app with a pre-filled text.',
  icon: 'lucide:message-square',
  fields: [
    { key: 'phone', required: true },
    { key: 'message', required: false },
  ],
  generate: (values) => {
    const phone = normalizePhone(values.phone ?? '')
    const message = values.message?.trim()
    const params = message ? `?body=${encodeURIComponent(message)}` : ''
    return `sms:${phone}${params}`
  },
}
