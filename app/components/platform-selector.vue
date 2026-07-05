<script setup lang="ts">
import { generators } from '~/generators'

defineProps<{ currentId: string }>()
</script>

<template>
  <!-- Responsive navigation: Horizontal scroll bar on mobile, vertical stack list on desktop -->
  <nav
    aria-label="Select a platform"
    class="flex flex-row overflow-x-auto gap-2 p-1 w-full scroll-smooth lg:flex-col lg:overflow-x-visible lg:gap-2"
  >
    <NuxtLink
      v-for="generator in generators"
      :key="generator.id"
      :to="`/generators/${generator.id}`"
      :aria-current="generator.id === currentId ? 'page' : undefined"
      class="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98] select-none lg:text-sm lg:px-4 lg:py-3 lg:w-full lg:gap-3"
      :class="generator.id === currentId
        ? 'border-primary bg-primary/10 text-primary shadow-xs ring-1 ring-primary/20'
        : 'border-border/60 bg-surface/50 text-text-secondary hover:border-primary/30 hover:bg-surface hover:text-text-primary'"
    >
      <UIcon :name="generator.icon" class="size-4.5 lg:size-5" />
      <span>{{ generator.name }}</span>
    </NuxtLink>
  </nav>
</template>
