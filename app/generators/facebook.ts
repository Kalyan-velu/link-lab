import type { GeneratorConfig } from '~/types/generator'
import { normalizeUrl } from '~/utils/normalize-url'

export const facebook: GeneratorConfig = {
  id: 'facebook',
  name: 'Messenger',
  description: 'Start a direct chat on Facebook Messenger, link to a Facebook Profile, or share a link to Facebook.',
  icon: 'simple-icons:messenger',
  supportedTypes: ['dm', 'profile', 'post'],
  fields: [
    { key: 'username', required: true, label: 'Facebook Username' }
  ],
  typeFields: {
    dm: [
      { key: 'username', required: true, label: 'Facebook Page Username' },
      { key: 'message', required: false, label: 'Pre-filled message (optional)' }
    ],
    profile: [
      { key: 'username', required: true, label: 'Facebook Username' }
    ],
    post: [
      { key: 'website', required: true, label: 'URL to share' }
    ]
  },
  generate: (values, type = 'dm') => {
    if (type === 'profile') {
      const username = (values.username ?? '').trim().replace(/^@/, '')
      return `https://facebook.com/${username}`
    }
    if (type === 'post') {
      const url = normalizeUrl(values.website ?? '')
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    }
    const username = (values.username ?? '').trim().replace(/^@/, '')
    const message = (values.message ?? '').trim()
    const query = message ? `?text=${encodeURIComponent(message)}` : ''
    return `https://m.me/${username}${query}`
  },
  typeTemplates: {
    dm: 'https://m.me/{username}?text={message}',
    profile: 'https://facebook.com/{username}',
    post: 'https://www.facebook.com/sharer/sharer.php?u={url}'
  },
  typeExplanations: {
    dm: 'Messenger\'s m.me short links are built for Facebook Pages rather than personal profiles — the username should be a Page\'s username. The `text` parameter is not part of Meta\'s official m.me spec (which only documents a tracking `ref` param) but is a long-standing, widely confirmed behavior: it pre-fills the message composer when the link is opened.',
    profile: 'Facebook profile links direct users to the classic timeline view page. On mobile devices, this triggers the native Facebook app to load the user profile.',
    post: 'The sharer.php dialog is Facebook\'s legacy Share Link tool. Unlike the modern Share Dialog (`/dialog/share`), it needs no registered `app_id`, making it the only share link a client-side tool can generate without a developer account. It only accepts a `u` (URL) parameter — the shared title/description/image are pulled from that URL\'s Open Graph tags, not passed directly.'
  }
}
