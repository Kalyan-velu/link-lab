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
}
