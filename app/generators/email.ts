import type { GeneratorConfig } from '~/types/generator'

export const email: GeneratorConfig = {
  id: 'email',
  name: 'Email',
  description: 'Open a pre-filled email draft.',
  icon: 'lucide:mail',
  fields: [
    { key: 'email', required: true },
    { key: 'subject', required: false },
    { key: 'body', required: false },
  ],
  generate: (values, type = 'dm') => {
    const to = (values.email ?? '').trim()
    const params: string[] = []
    if (values.subject?.trim()) params.push(`subject=${encodeURIComponent(values.subject.trim())}`)
    if (values.body?.trim()) params.push(`body=${encodeURIComponent(values.body.trim())}`)
    return `mailto:${to}${params.length ? `?${params.join('&')}` : ''}`
  },
  formatTemplate: 'mailto:{email}?subject={subject}&body={message}',
  formatExplanation: 'The mailto protocol scheme (RFC 6068) launches the default email client on the user\'s system. Parameters like `subject` and `body` are appended as percent-encoded query fields — note that mailto encoding must use `%20` for spaces rather than the `+` form-encoding used in HTTP query strings, since some mail clients insert a literal "+" otherwise. When clicked, it initializes a new draft with the pre-filled parameters, making email communication instant.',
}
