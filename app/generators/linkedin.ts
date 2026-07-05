import type { GeneratorConfig } from '~/types/generator'

export const linkedin: GeneratorConfig = {
  id: 'linkedin',
  name: 'LinkedIn',
  description: 'Open a LinkedIn profile.',
  icon: 'simple-icons:linkedin',
  fields: [{ key: 'username', required: true }],
  generate: (values) => {
    const username = (values.username ?? '').trim().replace(/^@/, '')
    return `https://linkedin.com/in/${username}`
  },
}
