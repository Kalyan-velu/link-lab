import type { GeneratorConfig } from '~/types/generator'

export const instagram: GeneratorConfig = {
  id: 'instagram',
  name: 'Instagram DM',
  description: 'Open a direct message chat window on Instagram.',
  icon: 'simple-icons:instagram',
  fields: [{ key: 'username', required: true, label: 'Instagram Username' }],
  generate: (values) => {
    const username = (values.username ?? '').trim().replace(/^@/, '')
    return `https://ig.me/m/${username}`
  },
  formatTemplate: 'https://ig.me/m/{username}',
  formatExplanation: "Instagram's ig.me domain provides deep linking straight into Instagram Direct Messages (DMs). When clicked on a mobile device, it opens the chat thread inside the native Instagram app. On desktop, it routes directly to the web inbox interface.",
}
