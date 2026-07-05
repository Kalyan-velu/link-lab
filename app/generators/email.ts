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
  generate: (values) => {
    const to = (values.email ?? '').trim()
    const params = new URLSearchParams()
    if (values.subject?.trim()) params.set('subject', values.subject.trim())
    if (values.body?.trim()) params.set('body', values.body.trim())
    const query = params.toString()
    return `mailto:${to}${query ? `?${query}` : ''}`
  },
  formatTemplate: 'mailto:{email}?subject={subject}&body={message}',
  formatExplanation: 'The mailto protocol scheme launches the default email client on the user\'s system. Parameters like `subject` and `body` are appended as URL-encoded query parameters. When clicked, it initializes a new draft with the pre-filled parameters, making email communication instant.',
}
