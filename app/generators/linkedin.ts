import type { GeneratorConfig } from '~/types/generator'
import { normalizeUrl } from '~/utils/normalize-url'

export const linkedin: GeneratorConfig = {
  id: 'linkedin',
  name: 'LinkedIn',
  description: 'Open a LinkedIn profile, or share a link to LinkedIn.',
  icon: 'simple-icons:linkedin',
  supportedTypes: ['profile', 'post'],
  fields: [{ key: 'username', required: true }],
  typeFields: {
    profile: [{ key: 'username', required: true, label: 'LinkedIn Username' }],
    post: [{ key: 'website', required: true, label: 'URL to share' }]
  },
  generate: (values, type = 'profile') => {
    if (type === 'post') {
      const url = normalizeUrl(values.website ?? '')
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    }
    const username = (values.username ?? '').trim().replace(/^@/, '')
    return `https://linkedin.com/in/${username}`
  },
  typeTemplates: {
    profile: 'https://linkedin.com/in/{username}',
    post: 'https://www.linkedin.com/sharing/share-offsite/?url={url}'
  },
  typeExplanations: {
    profile: 'LinkedIn profile deep links use the standard /in/ subpath followed by the user\'s custom profile alias. This redirects the user directly to the member profile, allowing them to connect or message.',
    post: 'LinkedIn\'s share-offsite endpoint opens a compose box pre-loaded with the given URL, pulling its title and description from that page\'s Open Graph tags. There is no public parameter for custom post text — LinkedIn only exposes that via its authenticated UGC Posts API. Note LinkedIn does not offer a public deep link to message an arbitrary member; messaging is connection-gated and has no URL-based composer.',
  }
}
