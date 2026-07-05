import {reactive, ref} from 'vue'
import type {FieldKey} from '~/types/field'
import type {FieldValues} from '~/types/generator'
import {CONTENT_FIELD_KEYS} from '~/utils/field-scope'
import {generators} from '~/generators'

/**
 * Holds the selected generator id and all shared field values for the
 * current session only — nothing is persisted (no localStorage, no
 * cookies), so phone numbers and message content never outlive the tab.
 * Values persist across platform switches within the same session.
 * `resetCurrent` clears only the content fields (message/subject/body/title)
 * used by the currently selected generator, leaving global identity fields
 * untouched.
 */
export function useGeneratorState(initialId?: string) {
  const selectedId = ref<string>(initialId ?? generators[0]?.id ?? '')
  const values = reactive<FieldValues>({})

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
