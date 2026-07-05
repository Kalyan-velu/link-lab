import type { GeneratorConfig } from '~/types/generator'
import { normalizePhone } from '~/utils/normalize-phone'

export const signal: GeneratorConfig = {
  id: 'signal',
  name: 'Signal',
  description: 'Start a secure private conversation on Signal.',
  icon: 'simple-icons:signal',
  fields: [{ key: 'phone', required: true, label: 'Phone Number' }],
  generate: (values, type = 'dm') => {
    const phone = normalizePhone(values.phone ?? '').replace(/^\+/, '')
    return `https://signal.me/#p/+${phone}`
  },
  formatTemplate: 'https://signal.me/#p/+{phone}',
  formatExplanation: 'Signal direct conversation links use the signal.me domain with the phone number parameter in full international format (including country code with a leading plus). When clicked, this link triggers the secure Signal messenger app to initiate a direct chat session.',
}
