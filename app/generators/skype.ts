import type { GeneratorConfig } from '~/types/generator'

export const skype: GeneratorConfig = {
  id: 'skype',
  name: 'Skype',
  description: 'Initiate a direct chat or call on Skype.',
  icon: 'simple-icons:skype',
  fields: [{ key: 'username', required: true, label: 'Skype Username, Email or Phone' }],
  generate: (values) => {
    const username = (values.username ?? '').trim()
    return `skype:${username}?chat`
  },
  formatTemplate: 'skype:{username}?chat',
  formatExplanation: 'Skype uses the custom URI scheme prefix `skype:`. Adding the query parameter `?chat` instructs the Skype application to instantly open the text chat window for the specified username, email, or live account ID.',
}
