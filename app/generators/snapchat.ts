import type { GeneratorConfig } from '~/types/generator'

export const snapchat: GeneratorConfig = {
  id: 'snapchat',
  name: 'Snapchat',
  description: 'Open a Snapchat profile to add and chat.',
  icon: 'simple-icons:snapchat',
  fields: [{ key: 'username', required: true, label: 'Snapchat Username' }],
  generate: (values) => {
    const username = (values.username ?? '').trim().replace(/^@/, '')
    return `https://snapchat.com/add/${username}`
  },
  formatTemplate: 'https://snapchat.com/add/{username}',
  formatExplanation: 'Snapchat profile deep links utilize the snapchat.com/add path. When loaded, it prompts the user to add the specified account as a friend in the Snapchat mobile application, making username discovery instant.',
}
