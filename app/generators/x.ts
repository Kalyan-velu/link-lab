import type { GeneratorConfig } from '~/types/generator'

export const x: GeneratorConfig = {
  id: 'x',
  name: 'X (Twitter)',
  description: 'Create a pre-filled post, link to an X Profile, or open an X DM composer.',
  icon: 'simple-icons:x',
  supportedTypes: ['post', 'profile', 'dm'],
  fields: [
    { key: 'message', required: true, label: 'Post text' }
  ],
  typeFields: {
    post: [
      { key: 'message', required: true, label: 'Post text' },
      { key: 'username', required: false, label: 'Mention (optional)' }
    ],
    profile: [
      { key: 'username', required: true, label: 'X Username' }
    ],
    dm: [
      { key: 'username', required: true, label: 'Recipient\'s numeric User ID' },
      { key: 'message', required: false, label: 'Pre-filled message (optional)' }
    ]
  },
  generate: (values, type = 'post') => {
    if (type === 'profile') {
      const username = (values.username ?? '').trim().replace(/^@/, '')
      return `https://x.com/${username}`
    }
    if (type === 'dm') {
      const recipientId = (values.username ?? '').trim().replace(/^@/, '')
      const message = values.message?.trim()
      const params = new URLSearchParams({ recipient_id: recipientId })
      if (message) params.set('text', message)
      return `https://x.com/messages/compose?${params.toString()}`
    }

    // Default 'post' behavior
    const params = new URLSearchParams()
    params.set('text', values.message?.trim() ?? '')
    const via = (values.username ?? '').trim().replace(/^@/, '')
    if (via) params.set('via', via)
    return `https://x.com/intent/tweet?${params.toString()}`
  },
  typeTemplates: {
    post: 'https://x.com/intent/tweet?text={message}&via={username}',
    profile: 'https://x.com/{username}',
    dm: 'https://x.com/messages/compose?recipient_id={recipient_id}&text={message}'
  },
  typeExplanations: {
    post: 'X (formerly Twitter) Tweet Intent links (`/intent/tweet`) let users post updates directly. The query parameters populate text and associate it with a "via" account.',
    profile: 'X profile links direct users to the profile feed. On mobile, this link automatically opens inside the native X application.',
    dm: 'X DM composer links require the recipient\'s numeric user ID in `recipient_id` — an @handle will not resolve, since X does not accept usernames here. You can look up a numeric ID with a third-party converter tool. The optional `text` parameter pre-fills the message body.'
  }
}
