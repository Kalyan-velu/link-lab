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
  formatTemplate: 'https://wa.me/{phone}?text={message}',
  formatExplanation: 'The WhatsApp "Click to Chat" API uses the wa.me domain to start a conversation with any phone number. The phone number must be in full international format (including country code) but without any leading plus sign (+), zeroes (00), spaces, or parentheses. If a message parameter is supplied, it is URL-encoded and automatically pre-filled in the sender\'s input box.',
}
