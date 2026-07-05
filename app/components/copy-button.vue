<script setup lang="ts">
import { ref } from 'vue'
import { copyToClipboard } from '~/utils/copy-to-clipboard'

const props = defineProps<{ text: string }>()

const copied = ref(false)

async function handleClick(): Promise<void> {
  const ok = await copyToClipboard(props.text)
  if (!ok) return

  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 1500)
}
</script>

<template>
  <UButton
    :disabled="!text"
    :color="copied ? 'success' : 'primary'"
    :icon="copied ? 'lucide:check' : 'lucide:copy'"
    variant="soft"
    @click="handleClick"
  >
    {{ copied ? 'Copied' : 'Copy' }}
  </UButton>
</template>
