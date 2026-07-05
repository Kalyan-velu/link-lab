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
  formatTemplate: 'https://linkedin.com/in/{username}',
  formatExplanation: 'LinkedIn profile deep links use the standard /in/ subpath followed by the user\'s custom profile alias. This redirects the user directly to the member profile, allowing them to connect or message.',
}
