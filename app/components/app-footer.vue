<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const isGeneratorPage = computed(() => route.name === 'generators-id')
</script>

<template>
  <!-- Dynamically hide the footer on tool generator routes to prevent layout clutter and overlaps -->
  <footer v-if="!isGeneratorPage" class="border-t border-border/30 bg-surface/20">
    <div class="mx-auto flex w-full max-w-xl flex-col items-center gap-2 px-4 py-6 text-center text-xs text-text-secondary select-none">
      <p>Links are generated in your browser, nothing is ever stored.</p>
      <p class="text-muted font-semibold">&copy; {{ new Date().getFullYear() }} LinkLab</p>
    </div>
  </footer>
</template>
