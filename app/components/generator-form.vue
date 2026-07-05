<script setup lang="ts">
import type {FieldValues, GeneratorConfig, ValidationErrors, GeneratorFieldRef} from '~/types/generator'
import {getField} from '~/utils/fields'

defineProps<{
  generator: GeneratorConfig
  values: FieldValues
  errors: ValidationErrors
  fields?: GeneratorFieldRef[]
}>()

const emit = defineEmits<{ 'update:value': [key: string, value: string] }>()

function onInput(key: string, event: Event): void {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  emit('update:value', key, target.value)
}
</script>

<template>
  <form class="flex flex-col gap-5" @submit.prevent>
    <div v-for="fieldRef in (fields || generator.fields)" :key="fieldRef.key" class="flex flex-col gap-1.5">
      <label :for="`field-${fieldRef.key}`" class="text-sm font-medium text-text-primary">
        {{ fieldRef.label ?? getField(fieldRef.key).label }}
        <span v-if="fieldRef.required" aria-hidden="true" class="text-[var(--color-error)]">*</span>
      </label>

      <textarea
        v-if="getField(fieldRef.key).type === 'textarea'"
        :id="`field-${fieldRef.key}`"
        :value="values[fieldRef.key] ?? ''"
        :placeholder="fieldRef.placeholder ?? getField(fieldRef.key).placeholder"
        :aria-invalid="Boolean(errors[fieldRef.key])"
        :aria-describedby="errors[fieldRef.key] ? `error-${fieldRef.key}` : undefined"
        rows="3"
        class="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-primary"
        @input="onInput(fieldRef.key, $event)"
      />
      <input
        v-else
        :id="`field-${fieldRef.key}`"
        :type="getField(fieldRef.key).type"
        :value="values[fieldRef.key] ?? ''"
        :placeholder="fieldRef.placeholder ?? getField(fieldRef.key).placeholder"
        :autocomplete="getField(fieldRef.key).autocomplete"
        :aria-invalid="Boolean(errors[fieldRef.key])"
        :aria-describedby="errors[fieldRef.key] ? `error-${fieldRef.key}` : undefined"
        class="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-primary"
        @input="onInput(fieldRef.key, $event)"
      >

      <p v-if="errors[fieldRef.key]" :id="`error-${fieldRef.key}`" class="text-sm text-error">
        {{ errors[fieldRef.key] }}
      </p>
    </div>
  </form>
</template>
