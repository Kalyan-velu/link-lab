<script setup lang="ts">
import {ref, watch} from 'vue'
import QRCode from 'qrcode'

const props = defineProps<{ value: string }>()

const dataUrl = ref('')

watch(
  () => props.value,
  async (value) => {
    if (!value) {
      dataUrl.value = ''
      return
    }

    try {
      dataUrl.value = await QRCode.toDataURL(value, { margin: 1, width: 240 })
    } catch {
      dataUrl.value = ''
    }
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="dataUrl" class="flex flex-col items-center gap-3">
    <img :src="dataUrl" alt="QR code linking to the generated URL" class="rounded-lg border border-border" width="240" height="240">
    <a :href="dataUrl" download="linklab-qr-code.png" class="text-sm text-primary hover:text-primary-hover">
      Download QR code
    </a>
  </div>
</template>
