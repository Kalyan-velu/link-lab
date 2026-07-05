import type { FieldValues, GeneratorConfig, ValidationErrors, LinkType } from '~/types/generator'
import { getField } from './fields'

/**
 * Validates field values against a generator's active fields for a specific link type
 * and each shared field's own format rules. Returns an empty object when valid.
 */
export function validateGenerator(
  config: GeneratorConfig, 
  values: FieldValues,
  type?: LinkType
): ValidationErrors {
  const errors: ValidationErrors = {}

  // Determine active fields based on selected link type
  const fields = type && config.typeFields
    ? config.typeFields[type] || config.fields
    : config.fields

  for (const ref of fields) {
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
 * generator's own generate() function for the selected link type.
 * Never throws — validation failures are surfaced through `errors` instead.
 */
export function tryGenerate(
  config: GeneratorConfig, 
  values: FieldValues,
  type?: LinkType
): GenerateResult {
  const errors = validateGenerator(config, values, type)

  if (Object.keys(errors).length > 0) {
    return { url: null, errors }
  }

  try {
    return { url: config.generate(values, type), errors: {} }
  } catch (error) {
    const fields = type && config.typeFields
      ? config.typeFields[type] || config.fields
      : config.fields
    return {
      url: null,
      errors: { [fields[0]?.key ?? 'phone']: error instanceof Error ? error.message : 'Unable to generate URL.' },
    }
  }
}
