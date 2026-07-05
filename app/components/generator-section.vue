<script setup lang="ts">
import {computed} from 'vue'
import {useGeneratorState} from '~/composables/use-generator-state'
import {getGenerator} from '~/generators'
import {tryGenerate, validateGenerator} from '~/utils/generator-engine'
import type {FieldKey} from '~/types/field'

const { selectedId, values, selectGenerator, setValue, resetCurrent } = useGeneratorState()

const generator = computed(() => getGenerator(selectedId.value))

const hasAnyValue = computed(() =>
  generator.value ? generator.value.fields.some((fieldRef) => Boolean(values[fieldRef.key]?.trim())) : false,
)

const errors = computed(() => (generator.value && hasAnyValue.value ? validateGenerator(generator.value, values) : {}))

const result = computed(() => (generator.value ? tryGenerate(generator.value, values) : { url: null, errors: {} }))

function handleUpdateValue(key: string, value: string): void {
  setValue(key as FieldKey, value)
}
</script>

<template>
  <AppSection
    id="generator"
    title="Build your link"
    description="Pick a platform, fill in the details, and get a ready-to-share deep link."
  >
    <div v-if="generator" class="flex flex-col gap-8">
      <PlatformSelector :model-value="selectedId" @update:model-value="selectGenerator" />

      <div class="grid gap-8 md:grid-cols-2">
        <div class="flex flex-col gap-4">
          <GeneratorForm
            :generator="generator"
            :values="values"
            :errors="errors"
            @update:value="handleUpdateValue"
          />
          <UButton variant="soft" color="neutral" icon="lucide:rotate-ccw" class="self-start" @click="resetCurrent">
            Reset
          </UButton>
        </div>

        <div class="flex flex-col gap-4">
          <div v-if="result.url" class="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
            <p class="break-all font-mono text-sm text-text-primary">{{ result.url }}</p>
            <div class="flex flex-wrap gap-2">
              <CopyButton :text="result.url" />
              <UButton :to="result.url" target="_blank" variant="outline" icon="lucide:external-link">
                Open
              </UButton>
            </div>
            <QRCodePreview :value="result.url" />
          </div>
          <EmptyState
            v-else
            title="Your link will appear here"
            description="Fill in the required fields to generate a deep link."
          />
        </div>
      </div>
    </div>
  </AppSection>
</template>
