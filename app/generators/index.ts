import type { GeneratorConfig } from '~/types/generator'
import { email } from './email'
import { facebook } from './facebook'
import { googleMaps } from './google-maps'
import { instagram } from './instagram'
import { linkedin } from './linkedin'
import { phone } from './phone'
import { sms } from './sms'
import { telegram } from './telegram'
import { whatsapp } from './whatsapp'
import { x } from './x'

/**
 * All available deep link generators. Adding a new platform only requires
 * creating a new GeneratorConfig file and listing it here — no switch
 * statements or UI changes needed.
 */
export const generators: GeneratorConfig[] = [
  whatsapp,
  telegram,
  sms,
  phone,
  email,
  instagram,
  facebook,
  linkedin,
  x,
  googleMaps,
]

export const generatorRegistry: Record<string, GeneratorConfig> = Object.fromEntries(
  generators.map((generator) => [generator.id, generator]),
)

export function getGenerator(id: string): GeneratorConfig | undefined {
  return generatorRegistry[id]
}
