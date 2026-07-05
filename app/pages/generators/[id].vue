<script setup lang="ts">
import { computed } from 'vue'
import { getGenerator } from '~/generators'

definePageMeta({
  validate: (route) => Boolean(getGenerator(String(route.params.id))),
})

const route = useRoute()
const id = computed(() => String(route.params.id))
const generator = computed(() => getGenerator(id.value)!)

const requestUrl = useRequestURL()
const canonicalUrl = computed(() => new URL(`/generators/${id.value}`, requestUrl.origin).toString())

const pageTitle = computed(() => `${generator.value.name} Link Generator — Free & Instant | LinkLab`)
const pageDescription = computed(
  () => `${generator.value.description} Generate a ready-to-share ${generator.value.name} link in seconds — free, no signup, nothing stored.`,
)

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: canonicalUrl,
  twitterCard: 'summary',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
})

// Brand mapping config for local color scoping
const brandColorMap: Record<string, { main: string, hover: string, bg: string, text: string }> = {
  whatsapp: { main: '#25D366', hover: '#20bd5a', bg: 'bg-[#25D366]', text: 'text-[#25D366]' },
  telegram: { main: '#24A1DE', hover: '#1f8ebd', bg: 'bg-[#24A1DE]', text: 'text-[#24A1DE]' },
  signal: { main: '#3A76F0', hover: '#2b65db', bg: 'bg-[#3A76F0]', text: 'text-[#3A76F0]' },
  facebook: { main: '#0084FF', hover: '#006ed4', bg: 'bg-[#0084FF]', text: 'text-[#0084FF]' },
  instagram: { main: '#ee2a7b', hover: '#cc1f66', bg: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', text: 'text-[#ee2a7b]' },
  sms: { main: '#0b84ff', hover: '#0066cc', bg: 'bg-[#0b84ff]', text: 'text-[#0b84ff]' },
  phone: { main: '#34C759', hover: '#2ba84a', bg: 'bg-[#34C759]', text: 'text-[#34C759]' },
  email: { main: '#EA4335', hover: '#d13427', bg: 'bg-[#EA4335]', text: 'text-[#EA4335]' },
  snapchat: { main: '#FFFC00', hover: '#e6e300', bg: 'bg-[#FFFC00]', text: 'text-neutral-800' },
  skype: { main: '#00AFF0', hover: '#009cd6', bg: 'bg-[#00AFF0]', text: 'text-[#00AFF0]' },
  linkedin: { main: '#0A66C2', hover: '#08529c', bg: 'bg-[#0A66C2]', text: 'text-[#0A66C2]' },
  x: { main: '#000000', hover: '#1c1c1c', bg: 'bg-black', text: 'text-black' },
  'google-maps': { main: '#4285F4', hover: '#2a75f3', bg: 'bg-[#4285F4]', text: 'text-[#4285F4]' }
}

const currentBrand = computed(() => brandColorMap[id.value] || { main: '#003f88', hover: '#0063d4', bg: 'bg-[#003f88]', text: 'text-[#003f88]' })

useHead(() => ({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
}))
</script>

<template>
  <!-- Main layout frame. On desktop, sets height to fill screen and locks window scroll -->
  <div 
    class="relative overflow-hidden min-h-screen pb-28 lg:pb-0 lg:h-[calc(100vh-73px)] lg:min-h-0 lg:overflow-hidden"
    :style="{ 
      '--color-primary': currentBrand.main, 
      '--color-primary-hover': currentBrand.hover 
    }"
  >
    <!-- Background Aura Glow -->
    <div 
      class="absolute top-0 left-1/2 -z-10 h-[500px] w-full max-w-7xl -translate-x-1/2 opacity-[0.07] blur-[120px] pointer-events-none rounded-full transition-all duration-700"
      :class="currentBrand.bg"
    />

    <!-- Main Section Arena -->
    <div class="mx-auto max-w-5xl h-full px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6">
      <GeneratorSection :generator-id="id" />
    </div>
  </div>
</template>
