<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { generators } from '~/generators'

const scrolled = ref(false)
const dropdownOpen = ref(false)
let dropdownTimeout: ReturnType<typeof setTimeout> | null = null

// Brand style details for platform selection highlights
const brandStyles: Record<string, { bg: string, text: string, hoverText: string }> = {
  whatsapp: { bg: 'hover:bg-[#25D366]/10', text: 'text-[#25D366]', hoverText: 'group-hover:text-[#25D366]' },
  telegram: { bg: 'hover:bg-[#24A1DE]/10', text: 'text-[#24A1DE]', hoverText: 'group-hover:text-[#24A1DE]' },
  signal: { bg: 'hover:bg-[#3A76F0]/10', text: 'text-[#3A76F0]', hoverText: 'group-hover:text-[#3A76F0]' },
  facebook: { bg: 'hover:bg-[#0084FF]/10', text: 'text-[#0084FF]', hoverText: 'group-hover:text-[#0084FF]' },
  instagram: { bg: 'hover:bg-[#ee2a7b]/10', text: 'text-[#ee2a7b]', hoverText: 'group-hover:text-[#ee2a7b]' },
  sms: { bg: 'hover:bg-[#0b84ff]/10', text: 'text-[#0b84ff]', hoverText: 'group-hover:text-[#0b84ff]' },
  phone: { bg: 'hover:bg-[#34C759]/10', text: 'text-[#34C759]', hoverText: 'group-hover:text-[#34C759]' },
  email: { bg: 'hover:bg-[#EA4335]/10', text: 'text-[#EA4335]', hoverText: 'group-hover:text-[#EA4335]' },
  snapchat: { bg: 'hover:bg-[#FFFC00]/10', text: 'text-neutral-800', hoverText: 'group-hover:text-[#FFFC00]' },
  skype: { bg: 'hover:bg-[#00AFF0]/10', text: 'text-[#00AFF0]', hoverText: 'group-hover:text-[#00AFF0]' },
  linkedin: { bg: 'hover:bg-[#0A66C2]/10', text: 'text-[#0A66C2]', hoverText: 'group-hover:text-[#0A66C2]' },
  x: { bg: 'hover:bg-neutral-800/10', text: 'text-neutral-800', hoverText: 'group-hover:text-black' },
  'google-maps': { bg: 'hover:bg-[#4285F4]/10', text: 'text-[#4285F4]', hoverText: 'group-hover:text-[#4285F4]' }
}

function handleScroll() {
  scrolled.value = window.scrollY > 15
}

function showDropdown() {
  if (dropdownTimeout) clearTimeout(dropdownTimeout)
  dropdownOpen.value = true
}

function hideDropdown() {
  dropdownTimeout = setTimeout(() => {
    dropdownOpen.value = false
  }, 150)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (dropdownTimeout) clearTimeout(dropdownTimeout)
})
</script>

<template>
  <header 
    class="sticky top-0 z-50 w-full transition-all duration-300 px-3 sm:px-6"
    :class="[
      scrolled 
        ? 'py-2' 
        : 'py-3 sm:py-5'
    ]"
  >
    <div 
      class="mx-auto flex w-full max-w-5xl items-center justify-between px-3 sm:px-4 py-2 transition-all duration-300"
      :class="[
        scrolled 
          ? 'rounded-full border border-border/50 bg-white/75 backdrop-blur-md shadow-md' 
          : 'rounded-none border-b border-transparent bg-transparent'
      ]"
    >
      <!-- Logo brand link (Left) -->
      <NuxtLink to="/" class="flex items-center gap-1.5 text-base font-bold text-text-primary tracking-tight select-none">
        <UIcon name="lucide:link-2" class="size-4.5 text-primary" />
        <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-display">LinkLab</span>
      </NuxtLink>

      <!-- Center navigation & Dropdown (Center - Hidden on mobile) -->
      <div 
        class="relative hidden sm:block"
        @mouseenter="showDropdown"
        @mouseleave="hideDropdown"
      >
        <button
          type="button"
          class="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-text-secondary transition-all hover:bg-surface hover:text-text-primary outline-none"
          :class="{ 'bg-surface text-text-primary': dropdownOpen }"
        >
          Select Platform
          <UIcon 
            name="lucide:chevron-down" 
            class="size-3.5 transition-transform duration-300" 
            :class="{ 'rotate-180': dropdownOpen }"
          />
        </button>

        <!-- Dropdown Card -->
        <Transition name="dropdown-slide">
          <div 
            v-if="dropdownOpen"
            class="absolute left-1/2 mt-2 w-72 -translate-x-1/2 rounded-2xl border border-border/60 bg-white p-2.5 shadow-xl backdrop-blur-md"
            @mouseenter="showDropdown"
            @mouseleave="hideDropdown"
          >
            <p class="px-2.5 pb-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-muted border-b border-border/30 font-display">
              Generators
            </p>
            
            <div class="mt-1.5 grid grid-cols-2 gap-0.5">
              <NuxtLink
                v-for="gen in generators"
                :key="gen.id"
                :to="`/generators/${gen.id}`"
                class="group flex items-center gap-2 rounded-lg p-2 transition-all"
                :class="[brandStyles[gen.id]?.bg || 'hover:bg-primary/5']"
                @click="dropdownOpen = false"
              >
                <!-- Platform Icon -->
                <div 
                  class="flex size-7 items-center justify-center rounded-md border border-border/30 bg-surface shadow-xs transition-colors group-hover:bg-white"
                >
                  <UIcon 
                    :name="gen.icon" 
                    class="size-4 text-text-secondary transition-colors"
                    :class="[brandStyles[gen.id]?.hoverText]"
                  />
                </div>
                <!-- Platform Name -->
                <span class="text-xs font-semibold text-text-secondary transition-colors group-hover:text-text-primary">
                  {{ gen.name }}
                </span>
              </NuxtLink>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Portfolio Link (Right) -->
      <a
        href="https://kalyanjyotiborah.pro"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1 rounded-full border border-border bg-white px-2.5 py-1.5 text-xs font-semibold text-text-secondary shadow-xs transition-all hover:border-primary/30 hover:bg-surface hover:text-text-primary"
      >
        <span class="hidden sm:inline">Built by</span> Kalyan
        <UIcon name="lucide:external-link" class="size-3 text-muted" />
      </a>
    </div>
  </header>
</template>

<style scoped>
.dropdown-slide-enter-active,
.dropdown-slide-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.dropdown-slide-enter-from {
  opacity: 0;
  transform: translate(-50%, 8px) scale(0.95);
}
.dropdown-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 4px) scale(0.95);
}
</style>
