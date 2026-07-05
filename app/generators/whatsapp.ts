import type { GeneratorConfig } from '~/types/generator'
import { normalizePhone } from '~/utils/normalize-phone'

export const whatsapp: GeneratorConfig = {
  id: 'whatsapp',
  name: 'WhatsApp',
  description: 'Open a WhatsApp chat with a pre-filled message.',
  icon: 'simple-icons:whatsapp',
  fields: [
    { key: 'phone', required: true },
    { key: 'message', required: false },
  ],
  generate: (values) => {
    const phone = normalizePhone(values.phone ?? '').replace(/^\+/, '')
    const message = values.message?.trim()
    const params = message ? `?text=${encodeURIComponent(message)}` : ''
    return `https://wa.me/${phone}${params}`
  },
}
