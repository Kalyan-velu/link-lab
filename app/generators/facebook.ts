import type { GeneratorConfig } from '~/types/generator'

export const facebook: GeneratorConfig = {
  id: 'facebook',
  name: 'Messenger',
  description: 'Start a chat on Facebook Messenger, with an optional pre-filled message.',
  icon: 'simple-icons:facebookmessenger',
  fields: [
    { key: 'username', required: true, label: 'Facebook Username' },
    { key: 'message', required: false, label: 'Pre-filled message (optional)' }
  ],
  generate: (values) => {
    const username = (values.username ?? '').trim().replace(/^@/, '')
    const message = (values.message ?? '').trim()
    const query = message ? `?text=${encodeURIComponent(message)}` : ''
    return `https://m.me/${username}${query}`
  },
  formatTemplate: 'https://m.me/{username}?text={message}',
  formatExplanation: "Messenger's m.me short links act as direct deep links to chat conversations. Replacing {username} with your Facebook page or personal profile username initiates a direct conversation. If specified, the optional text parameter pre-fills a message that the user can immediately send.",
}
