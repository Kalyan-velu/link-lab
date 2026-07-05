import type { GeneratorConfig } from '~/types/generator'

export const instagram: GeneratorConfig = {
  id: 'instagram',
  name: 'Instagram',
  description: 'Open an Instagram profile.',
  icon: 'simple-icons:instagram',
  fields: [{ key: 'username', required: true }],
  generate: (values) => {
    const username = (values.username ?? '').trim().replace(/^@/, '')
    return `https://instagram.com/${username}`
  },
}
