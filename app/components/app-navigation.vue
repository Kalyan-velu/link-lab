<script setup lang="ts"></script>

<template>
  <header class="border-b border-border bg-background">
    <nav class="mx-auto flex w-full max-w-xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="flex items-center gap-2 text-lg font-semibold text-text-primary">
        <UIcon name="lucide:link-2" class="size-5 text-primary" />
        LinkLab
      </NuxtLink>
      <a
        href="#generator"
        class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-hover"
      >
        Get started
      </a>
    </nav>
  </header>
</template>
