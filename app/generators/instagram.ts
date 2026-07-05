import type { GeneratorConfig } from '~/types/generator'

export const instagram: GeneratorConfig = {
  id: 'instagram',
  name: 'Instagram DM',
  description: 'Open a direct chat on Instagram, or link to an Instagram Profile.',
  icon: 'simple-icons:instagram',
  supportedTypes: ['dm', 'profile'],
  fields: [{ key: 'username', required: true, label: 'Instagram Username' }],
  typeFields: {
    dm: [{ key: 'username', required: true, label: 'Instagram Username' }],
    profile: [{ key: 'username', required: true, label: 'Instagram Username' }]
  },
  generate: (values, type = 'dm') => {
    const username = (values.username ?? '').trim().replace(/^@/, '')
    if (type === 'profile') {
      return `https://instagram.com/${username}`
    }
    return `https://ig.me/m/${username}`
  },
  typeTemplates: {
    dm: 'https://ig.me/m/{username}',
    profile: 'https://instagram.com/{username}'
  },
  typeExplanations: {
    dm: 'Instagram\'s ig.me domain provides deep linking straight into Instagram Direct Messages (DMs), launching the chat interface directly in the native application.',
    profile: 'Instagram profile links route users to the feed page of the account. If the native Instagram app is installed on mobile, it launches the profile within the app.'
  }
}
