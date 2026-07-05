<script setup lang="ts">
import {computed, watch} from 'vue'
import {useGeneratorState} from '~/composables/use-generator-state'
import {getGenerator} from '~/generators'
import {tryGenerate, validateGenerator} from '~/utils/generator-engine'
import type {FieldKey} from '~/types/field'

const props = defineProps<{ generatorId: string }>()

const { selectedId, values, selectGenerator, setValue, resetCurrent } = useGeneratorState(props.generatorId)

watch(() => props.generatorId, (id) => selectGenerator(id))

const generator = computed(() => getGenerator(selectedId.value))

const hasAnyValue = computed(() =>
  generator.value ? generator.value.fields.some((fieldRef) => Boolean(values[fieldRef.key]?.trim())) : false,
)

const errors = computed(() => (generator.value && hasAnyValue.value ? validateGenerator(generator.value, values) : {}))

const result = computed(() => (generator.value ? tryGenerate(generator.value, values) : { url: null, errors: {} }))

function handleUpdateValue(key: string, value: string): void {
  setValue(key as FieldKey, value)
}

// Brand mapping config for local color scoping
const brandColorMap: Record<string, { bg: string, text: string }> = {
  whatsapp: { bg: 'bg-[#25D366]', text: 'text-[#25D366]' },
  telegram: { bg: 'bg-[#24A1DE]', text: 'text-[#24A1DE]' },
  signal: { bg: 'bg-[#3A76F0]', text: 'text-[#3A76F0]' },
  facebook: { bg: 'bg-[#0084FF]', text: 'text-[#0084FF]' },
  instagram: { bg: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', text: 'text-[#ee2a7b]' },
  sms: { bg: 'bg-[#0b84ff]', text: 'text-[#0b84ff]' },
  phone: { bg: 'bg-[#34C759]', text: 'text-[#34C759]' },
  email: { bg: 'bg-[#EA4335]', text: 'text-[#EA4335]' },
  snapchat: { bg: 'bg-[#FFFC00]', text: 'text-neutral-800' },
  skype: { bg: 'bg-[#00AFF0]', text: 'text-[#00AFF0]' },
  linkedin: { bg: 'bg-[#0A66C2]', text: 'text-[#0A66C2]' },
  x: { bg: 'bg-black', text: 'text-black' },
  'google-maps': { bg: 'bg-[#4285F4]', text: 'text-[#4285F4]' }
}

const currentBrand = computed(() => brandColorMap[selectedId.value] || { bg: 'bg-[#003f88]', text: 'text-[#003f88]' })

const faqs = computed(() => [
  {
    question: `Is the ${generator.value?.name} link generator free?`,
    answer: `Yes. Generating ${generator.value?.name} links is completely free and runs entirely in your browser.`,
  },
  {
    question: 'Is anything I type saved or sent to a server?',
    answer: 'No. Nothing is stored, even locally — everything happens in memory and disappears when you leave the page.',
  },
  {
    question: `What does this ${generator.value?.name} link do?`,
    answer: generator.value?.description || '',
  },
])
</script>

<template>
  <div v-if="generator" class="grid gap-6 lg:grid-cols-12 lg:h-[calc(100vh-100px)] lg:overflow-hidden lg:gap-8">
    
    <div class="flex flex-col gap-6 lg:col-span-8 lg:h-full lg:overflow-y-auto no-scrollbar pb-10 lg:pb-16 lg:pr-4">
      <nav aria-label="Breadcrumb" class="text-xs text-text-secondary select-none">
        <ol class="flex items-center gap-2">
          <li>
            <NuxtLink to="/" class="hover:text-primary transition-colors font-semibold flex items-center gap-1">
              <UIcon name="lucide:home" class="size-3.5" />
              Home
            </NuxtLink>
          </li>
          <li aria-hidden="true" class="text-muted">/</li>
          <li aria-current="page" class="text-text-primary font-bold flex items-center gap-1">
            <UIcon :name="generator.icon" class="size-3.5" :class="currentBrand.text" />
            {{ generator.name }}
          </li>
        </ol>
      </nav>

      <section class="flex flex-col items-center lg:items-start gap-4 pt-4 text-center lg:text-left">
        <span 
          class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs"
          :class="currentBrand.bg"
        >
          <UIcon :name="generator.icon" class="size-3.5" />
          Free {{ generator.name }} Tool
        </span>
        
        <h1 class="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl leading-tight font-display">
          {{ generator.name }} Link Generator
        </h1>
        
        <p class="max-w-xl text-sm text-text-secondary leading-relaxed">
          {{ generator.description }} Fill in the details below and get a ready-to-share link instantly — free, private, and nothing is stored.
        </p>
      </section>

      <div class="rounded-2xl border border-border/50 bg-white p-5 sm:p-7 shadow-xs">
        <h3 class="text-sm font-bold uppercase tracking-wider text-primary mb-5 flex items-center gap-1.5 font-display border-b border-border/20 pb-3">
          <UIcon name="lucide:sliders" class="size-4" />
          Link Configuration
        </h3>
        
        <GeneratorForm
          :generator="generator"
          :values="values"
          :errors="errors"
          @update:value="handleUpdateValue"
        />
        
        <div class="mt-6 flex flex-col gap-3 items-center sm:flex-row sm:justify-between sm:items-center border-t border-border/20 pt-4">
          <span class="text-[11px] text-muted flex items-center gap-1 text-center sm:text-left select-none">
            <UIcon name="lucide:shield-check" class="size-3.5 text-primary" />
            Processed locally in browser
          </span>
          <UButton 
            variant="soft" 
            color="neutral" 
            icon="lucide:rotate-ccw" 
            class="rounded-full px-4 w-full sm:w-auto justify-center" 
            size="sm"
            @click="resetCurrent"
          >
            Reset Fields
          </UButton>
        </div>
      </div>

      <div class="rounded-2xl border border-border/50 bg-white p-5 sm:p-7 shadow-xs">
        <h3 class="text-sm font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-1.5 font-display border-b border-border/20 pb-3">
          <UIcon name="lucide:check-circle" class="size-4" />
          Generated Link
        </h3>

        <div v-if="result.url" class="flex flex-col gap-5">
          <div class="flex flex-col gap-3 rounded-xl border border-border/60 bg-surface p-4">
            <p class="break-all font-mono text-[11px] font-semibold text-text-primary select-all leading-relaxed">
              {{ result.url }}
            </p>
            <div class="flex flex-wrap gap-2">
              <CopyButton :text="result.url" class="rounded-full shadow-xs" size="sm" />
              <UButton 
                :to="result.url" 
                target="_blank" 
                variant="outline" 
                icon="lucide:external-link"
                class="rounded-full shadow-xs"
                size="sm"
              >
                Open Link
              </UButton>
            </div>
          </div>
          
          <div class="border-t border-border/20 pt-4 flex flex-col items-center">
            <QrCodePreview :value="result.url" />
          </div>
        </div>
        
        <EmptyState
          v-else
          title="Your link will appear here"
          description="Fill in the required fields above to generate a deep link."
          class="py-10"
        />
      </div>

      <div v-if="generator.formatTemplate" class="rounded-2xl border border-border/50 bg-white p-5 sm:p-7 shadow-xs">
        <h3 class="text-xs font-bold uppercase tracking-wider text-primary mb-2.5 flex items-center gap-1.5 font-display border-b border-border/20 pb-3">
          <UIcon name="lucide:settings" class="size-4" />
          Technical Specs
        </h3>
        <p class="text-xs text-text-secondary mb-4 leading-relaxed">
          Here is the direct deep link URL structure generated for this platform. Search engines and browsers use this format to route actions straight to the app:
        </p>
        
        <div class="relative rounded-lg bg-surface border border-border/60 p-3 sm:p-4 mb-4 shadow-inner flex items-center justify-between gap-3 group">
          <code class="break-all font-mono text-[11px] font-bold text-text-primary">
            {{ generator.formatTemplate }}
          </code>
          <CopyButton :text="generator.formatTemplate" class="shrink-0 scale-90 rounded-full" size="sm" />
        </div>
        
        <p class="text-xs text-text-secondary leading-relaxed pl-3 border-l-2 border-primary/50">
          {{ generator.formatExplanation }}
        </p>
      </div>

      <div class="rounded-2xl border border-border/50 bg-white p-5 sm:p-7 shadow-xs">
        <h3 class="text-sm font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-1.5 font-display border-b border-border/20 pb-3">
          <UIcon name="lucide:help-circle" class="size-4" />
          Frequently Asked Questions
        </h3>
        <div class="flex flex-col divide-y divide-border/60">
          <details v-for="faq in faqs" :key="faq.question" class="group py-4 first:pt-0 last:pb-0">
            <summary class="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-text-primary hover:text-primary transition-colors">
              {{ faq.question }}
              <div class="flex size-6 items-center justify-center rounded-full border border-border/50 bg-surface transition-colors group-hover:bg-primary/5">
                <UIcon 
                  name="lucide:chevron-down" 
                  class="size-3.5 text-muted transition-transform duration-300 group-open:rotate-180 group-hover:text-primary" 
                />
              </div>
            </summary>
            <p class="mt-2.5 text-xs text-text-secondary leading-relaxed pl-1">
              {{ faq.answer }}
            </p>
          </details>
        </div>
      </div>

    </div>

    <div class="fixed bottom-4 left-4 right-4 z-40 bg-white/90 backdrop-blur-md rounded-2xl border border-border/70 p-2.5 shadow-2xl lg:static lg:bg-transparent lg:border-none lg:shadow-none lg:p-0 lg:z-auto lg:backdrop-blur-none lg:col-span-4 lg:h-full lg:overflow-y-auto lg:pr-1 no-scrollbar pb-2 lg:pb-16">
      <div class="hidden lg:block mb-4 border-b border-border/20 pb-3">
        <h3 class="text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center gap-1.5 font-display">
          <UIcon name="lucide:layers" class="size-3.5 text-primary" />
          Other Platforms
        </h3>
      </div>
      
      <PlatformSelector :current-id="selectedId" />
    </div>

  </div>
</template>

<style scoped>
/* Utility to hide native scrollbar but allow vertical scrolling */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
