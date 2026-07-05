import type { GeneratorConfig } from '~/types/generator'
import { normalizeUrl } from '~/utils/normalize-url'

export const telegram: GeneratorConfig = {
  id: 'telegram',
  name: 'Telegram',
  description: 'Open a direct Telegram chat with a pre-filled message, link to a profile, or share a link.',
  icon: 'simple-icons:telegram',
  supportedTypes: ['dm', 'profile', 'post'],
  fields: [
    { key: 'username', required: true }
  ],
  typeFields: {
    dm: [
      { key: 'username', required: true, label: 'Telegram Username' },
      { key: 'message', required: false, label: 'Pre-filled Message (optional)' }
    ],
    profile: [
      { key: 'username', required: true, label: 'Telegram Username' }
    ],
    post: [
      { key: 'website', required: true, label: 'URL to share' },
      { key: 'message', required: false, label: 'Pre-filled message (optional)' }
    ]
  },
  generate: (values, type = 'dm') => {
    if (type === 'profile') {
      const username = (values.username ?? '').trim().replace(/^@/, '')
      return `https://t.me/${username}?profile`
    }
    if (type === 'post') {
      const url = normalizeUrl(values.website ?? '')
      const message = values.message?.trim()
      const params = new URLSearchParams({ url })
      if (message) params.set('text', message)
      return `https://t.me/share/url?${params.toString()}`
    }
    const username = (values.username ?? '').trim().replace(/^@/, '')
    const message = values.message?.trim()
    const params = message ? `?text=${encodeURIComponent(message)}` : ''
    return `https://t.me/${username}${params}`
  },
  typeTemplates: {
    dm: 'https://t.me/{username}?text={message}',
    profile: 'https://t.me/{username}?profile',
    post: 'https://t.me/share/url?url={url}&text={message}'
  },
  typeExplanations: {
    dm: 'Telegram direct messaging links use the t.me domain to open a chat window. Adding a text query parameter allows you to pass a pre-filled text message, which will be automatically loaded in the user\'s text composer.',
    profile: 'Telegram doesn\'t hard-separate a "view profile" link from a chat link — both route through t.me/{username}. Appending `?profile` is the documented way to bias the app toward opening the contact/info card instead of jumping straight into the chat window.',
    post: 'Telegram\'s share dialog (`t.me/share/url`) opens the native chat picker, letting the user choose which chat, group, or channel to forward the link (and optional text) into — Telegram\'s equivalent of Facebook\'s sharer.php or X\'s tweet intent.'
  }
}
