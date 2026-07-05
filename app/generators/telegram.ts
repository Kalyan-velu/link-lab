import type { GeneratorConfig } from '~/types/generator'

export const telegram: GeneratorConfig = {
  id: 'telegram',
  name: 'Telegram',
  description: 'Open a Telegram chat with a pre-filled message.',
  icon: 'simple-icons:telegram',
  fields: [
    { key: 'username', required: true },
    { key: 'message', required: false },
  ],
  generate: (values) => {
    const username = (values.username ?? '').trim().replace(/^@/, '')
    const message = values.message?.trim()
    const params = message ? `?text=${encodeURIComponent(message)}` : ''
    return `https://t.me/${username}${params}`
  },
  formatTemplate: 'https://t.me/{username}?text={message}',
  formatExplanation: 'Telegram direct links use the t.me domain to open a chat window. If a username is specified, the link opens a direct conversation with that user. Adding a text query parameter allows you to pass a pre-filled text message, which can be automatically prepared in the user\'s text composer.',
}
