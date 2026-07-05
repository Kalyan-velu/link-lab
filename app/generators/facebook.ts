import type { GeneratorConfig } from '~/types/generator'

export const facebook: GeneratorConfig = {
  id: 'facebook',
  name: 'Facebook',
  description: 'Open a Facebook profile or page.',
  icon: 'simple-icons:facebook',
  fields: [{ key: 'username', required: true }],
  generate: (values) => {
    const username = (values.username ?? '').trim().replace(/^@/, '')
    return `https://facebook.com/${username}`
  },
}
