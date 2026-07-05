import type { GeneratorConfig } from '~/types/generator'

export const snapchat: GeneratorConfig = {
  id: 'snapchat',
  name: 'Snapchat',
  description: 'Open Snapchat to add a user as a friend.',
  icon: 'simple-icons:snapchat',
  fields: [{ key: 'username', required: true, label: 'Snapchat Username' }],
  generate: (values, type = 'profile') => {
    const username = (values.username ?? '').trim().replace(/^@/, '')
    return `https://snapchat.com/add/${username}`
  },
  formatTemplate: 'https://snapchat.com/add/{username}',
  formatExplanation: 'Snapchat profile deep links utilize the snapchat.com/add path. When loaded, it prompts the user to add the specified account as a friend in the Snapchat mobile application. Snapchat does not expose a public deep link that opens a chat composer or post/Story creation screen directly — those only happen inside the app after the friend request is accepted.',
}
