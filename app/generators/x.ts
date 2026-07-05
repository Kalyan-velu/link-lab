import type { GeneratorConfig } from '~/types/generator'

export const x: GeneratorConfig = {
  id: 'x',
  name: 'X (Twitter)',
  description: 'Open a pre-filled post composer on X.',
  icon: 'simple-icons:x',
  fields: [
    { key: 'message', required: true, label: 'Post text' },
    { key: 'username', required: false, label: 'Mention (optional)' },
  ],
  generate: (values) => {
    const params = new URLSearchParams()
    params.set('text', values.message?.trim() ?? '')
    const via = (values.username ?? '').trim().replace(/^@/, '')
    if (via) params.set('via', via)
    return `https://twitter.com/intent/tweet?${params.toString()}`
  },
  formatTemplate: 'https://twitter.com/intent/tweet?text={message}&via={username}',
  formatExplanation: 'X (formerly Twitter) provides Tweet Intent links (`/intent/tweet`) to let users post a new update directly without searching for composer actions. The query parameters map the post text (`text`) and optionally attribute it to an author account (`via`).',
}
