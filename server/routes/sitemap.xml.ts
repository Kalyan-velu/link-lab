import { generators } from '~/generators'

export default defineEventHandler((event) => {
  const origin = getRequestURL(event).origin
  const urls = [
    `${origin}/`,
    ...generators.map((generator) => `${origin}/generators/${generator.id}`),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n`
    + `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
    + urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')
    + `\n</urlset>`

  setHeader(event, 'content-type', 'application/xml')
  return body
})
