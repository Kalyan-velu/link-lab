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
  formatTemplate: 'sms:{phone}?body={message}',
  formatExplanation: 'The sms protocol allows launching the device\'s native messaging application. Standard link structure is `sms:phone?body=message`. On iOS devices, the query string separator can sometimes require an ampersand (`&`) or a question mark (`?`) depending on the OS version, but modern devices usually accept standard URI search parameters. The body parameter is pre-filled directly in the text composer.',
}
