import type { FieldValues, GeneratorConfig, ValidationErrors } from '~/types/generator'
import { getField } from './fields'

/**
 * Validates field values against a generator's required fields and each
 * shared field's own format rules. Returns an empty object when valid.
 */
export function validateGenerator(config: GeneratorConfig, values: FieldValues): ValidationErrors {
  const errors: ValidationErrors = {}

  for (const ref of config.fields) {
    const raw = values[ref.key]?.trim() ?? ''

    if (ref.required && !raw) {
      errors[ref.key] = `${ref.label ?? getField(ref.key).label} is required.`
      continue
    }

    const formatError = getField(ref.key).validate(raw)
    if (formatError) {
      errors[ref.key] = formatError
    }
  }

  return errors
}

export interface GenerateResult {
  url: string | null
  errors: ValidationErrors
}

/**
 * Validates the given values and, if valid, builds the deep link URL via the
 * generator's own generate() function. Never throws — validation failures
 * are surfaced through `errors` instead.
 */
export function tryGenerate(config: GeneratorConfig, values: FieldValues): GenerateResult {
  const errors = validateGenerator(config, values)

  if (Object.keys(errors).length > 0) {
    return { url: null, errors }
  }

  try {
    return { url: config.generate(values), errors: {} }
  } catch (error) {
    return {
      url: null,
      errors: { [config.fields[0]?.key ?? 'phone']: error instanceof Error ? error.message : 'Unable to generate URL.' },
    }
  }
}
