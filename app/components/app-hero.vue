<script setup lang="ts">
import EllipseCarousel from '~/components/ellipse-carousel.vue'
</script>

<template>
  <section class="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 px-4 pt-20 pb-8 text-center sm:px-6">
    <span class="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary shadow-xs">
      <span class="relative flex size-2">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>
        <span class="relative inline-flex size-2 rounded-full bg-[#25D366]"></span>
      </span>
      Zero Data Stored • Free & Open
    </span>

    <h1 class="text-4xl font-extrabold tracking-tight text-text-primary sm:text-6xl lg:text-7xl max-w-4xl leading-[1.1]">
      Generate instant deep links for <br class="hidden sm:inline" />
      <span class="bg-linear-to-r from-imperial-blue-600 via-french-blue-500 to-steel-azure-600 bg-clip-text text-transparent">
        every platform
      </span>
    </h1>

    <p class="max-w-xl text-md text-text-secondary leading-relaxed mt-2">
      No signups, no trackers, and absolutely no database. Simply pick a platform, fill in your details, and start connecting.
    </p>

    <div class="w-full mt-8">
      <EllipseCarousel />
    </div>
  </section>
</template>
