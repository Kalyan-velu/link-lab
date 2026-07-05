<script setup lang="ts">
import {generators} from '~/generators'

defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [id: string] }>()
</script>

<template>
  <div role="radiogroup" aria-label="Select a platform" class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
    <button
      v-for="generator in generators"
      :key="generator.id"
      type="button"
      role="radio"
      :aria-checked="generator.id === modelValue"
      class="flex flex-col items-center gap-2 rounded-lg border p-4 text-sm font-medium transition-colors"
      :class="generator.id === modelValue
        ? 'border-primary bg-primary/10 text-primary'
        : 'border-border bg-surface text-text-secondary hover:border-primary/50'"
      @click="emit('update:modelValue', generator.id)"
    >
      <UIcon :name="generator.icon" class="size-6" />
      <span>{{ generator.name }}</span>
    </button>
  </div>
</template>
