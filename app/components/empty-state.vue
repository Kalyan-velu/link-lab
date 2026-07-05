<script setup lang="ts">
withDefaults(defineProps<{ icon?: string; title: string; description?: string }>(), {
  icon: 'lucide:link-2',
})
</script>

<template>
  <div class="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border px-6 py-10 text-center">
    <UIcon :name="icon" class="size-8 text-muted" />
    <p class="font-medium text-text-primary">{{ title }}</p>
    <p v-if="description" class="text-sm text-text-secondary">{{ description }}</p>
  </div>
</template>
