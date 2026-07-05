<script setup lang="ts">
import AppNavigation from "~/components/app-navigation.vue";
import AppFooter from "~/components/app-footer.vue";
</script>
<template>
  <div class="flex min-h-screen flex-col">
    <AppNavigation />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
