<script setup lang="ts">
import {computed} from 'vue'
import {generators} from '~/generators'

const requestUrl = useRequestURL()
const canonicalUrl = computed(() => new URL('/', requestUrl.origin).toString())

const title = 'LinkLab — Free Deep Link Generator for WhatsApp, Telegram, SMS & More'
const description = 'Generate ready-to-share deep links for WhatsApp, Telegram, SMS, email, Instagram, Facebook, LinkedIn, X, and Google Maps. Free, instant, and nothing is stored.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: canonicalUrl,
  twitterCard: 'summary',
  twitterTitle: title,
  twitterDescription: description,
})

useHead(() => ({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'LinkLab',
        url: canonicalUrl.value,
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: generators.map((generator, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${generator.name} Link Generator`,
          url: new URL(`/generators/${generator.id}`, requestUrl.origin).toString(),
        })),
      }),
    },
  ],
}))
</script>

<template>
  <div>
    <AppHero />
    <FaqSection />
  </div>
</template>
