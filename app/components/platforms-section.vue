<script setup lang="ts">
import {generators} from '~/generators'
</script>

<template>
  <AppSection
    id="platforms"
    title="Supported platforms"
    description="Every generator shares the same field model, so switching platforms never loses your input."
  >
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      <NuxtLink
        v-for="generator in generators"
        :key="generator.id"
        :to="`/generators/${generator.id}`"
        class="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface p-4 text-center transition-colors hover:border-primary/50"
      >
        <UIcon :name="generator.icon" class="size-6 text-primary" />
        <p class="text-sm font-medium text-text-primary">{{ generator.name }}</p>
        <p class="text-xs text-text-secondary">{{ generator.description }}</p>
      </NuxtLink>
    </div>
  </AppSection>
</template>
