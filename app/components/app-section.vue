<script setup lang="ts">
withDefaults(defineProps<{ id?: string; title?: string; description?: string }>(), {
  id: undefined,
  title: undefined,
  description: undefined,
})
</script>

<template>
  <section :id="id" class="mx-auto w-full max-w-lg px-4 py-16 sm:px-6 lg:px-8">
    <div v-if="title" class="mb-10 flex flex-col gap-2 text-center">
      <h2 class="text-3xl font-semibold tracking-tight text-text-primary">{{ title }}</h2>
      <p v-if="description" class="text-text-secondary">{{ description }}</p>
    </div>
    <slot />
  </section>
</template>
