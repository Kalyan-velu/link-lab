# LinkLab

LinkLab is a free deep link generator. Pick a platform, fill in a few fields, and get a ready to share link instantly. Everything runs in the browser; nothing is ever sent to a server or saved to storage.

## Supported platforms

- WhatsApp
- Telegram
- Signal
- Facebook
- Instagram
- SMS
- Phone call
- Email
- Snapchat
- LinkedIn
- X (Twitter)
- Google Maps

Each platform has its own page at `/generators/<id>` with a unique title, description, and structured data, so the tool can be found directly from search engines.

## Tech stack

- Nuxt 4
- Vue 3 and TypeScript
- Tailwind CSS via `@nuxt/ui`
- Vitest for unit and component tests

## Project structure

- `app/generators/` one config file per platform (fields, validation, and the URL builder)
- `app/composables/use-generator-state.ts` shared, in memory state for the currently selected generator
- `app/components/` UI: form, platform selector, QR preview, copy button, page sections
- `app/pages/` the homepage and the per platform generator pages
- `server/routes/sitemap.xml.ts` a dynamic sitemap listing every route
- `test/unit/` and `test/nuxt/` tests for utilities and components

## Setup

Install dependencies:

```bash
pnpm install
```

## Development

Start the dev server at `http://localhost:3000`:

```bash
pnpm dev
```

## Testing

```bash
pnpm test         # watch mode, all projects
pnpm test:unit    # plain TypeScript unit tests
pnpm test:nuxt    # component tests that need a Nuxt runtime
```

## Production

Build and preview:

```bash
pnpm build
pnpm preview
```

Or generate a fully static build:

```bash
pnpm generate
```

## Adding a new platform

Create a new file in `app/generators/` that exports a `GeneratorConfig` (id, name, description, icon, fields, and a `generate` function), then list it in `app/generators/index.ts`. No other UI changes are needed; the platform picker, the generator page, and the sitemap all read from that list automatically.
