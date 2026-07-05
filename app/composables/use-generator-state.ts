import { reactive, ref, watch } from 'vue'
import type { FieldKey } from '~/types/field'
import type { FieldValues } from '~/types/generator'
import { CONTENT_FIELD_KEYS } from '~/utils/field-scope'
import { generators } from '~/generators'

const STORAGE_KEY_GENERATOR = 'linklab:selected-generator'
const STORAGE_KEY_VALUES = 'linklab:field-values'

function readStorage<T>(key: string, fallback: T): T {
  if (typeof localStorage === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key: string, value: unknown): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage may be unavailable (private mode, quota) — fail silently.
  }
}

/**
 * Holds the selected generator id and all shared field values, persisted to
 * localStorage. Values persist across platform switches. `resetCurrent`
 * clears only the content fields (message/subject/body/title) used by the
 * currently selected generator, leaving global identity fields untouched.
 */
export function useGeneratorState() {
  const selectedId = ref<string>(readStorage(STORAGE_KEY_GENERATOR, generators[0]?.id ?? ''))
  const values = reactive<FieldValues>(readStorage(STORAGE_KEY_VALUES, {}))

  watch(selectedId, (id) => writeStorage(STORAGE_KEY_GENERATOR, id))
  watch(values, (v) => writeStorage(STORAGE_KEY_VALUES, v), { deep: true })

  function selectGenerator(id: string): void {
    selectedId.value = id
  }

  function setValue(key: FieldKey, value: string): void {
    values[key] = value
  }

  function resetCurrent(): void {
    const generator = generators.find((g) => g.id === selectedId.value)
    if (!generator) return

    for (const fieldRef of generator.fields) {
      if (CONTENT_FIELD_KEYS.includes(fieldRef.key)) {
        delete values[fieldRef.key]
      }
    }
  }

  return { selectedId, values, selectGenerator, setValue, resetCurrent }
}
