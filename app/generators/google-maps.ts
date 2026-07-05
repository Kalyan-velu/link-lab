import type { GeneratorConfig } from '~/types/generator'

export const googleMaps: GeneratorConfig = {
  id: 'google-maps',
  name: 'Google Maps',
  description: 'Open a location in Google Maps.',
  icon: 'lucide:map-pin',
  fields: [
    { key: 'address', required: false },
    { key: 'latitude', required: false },
    { key: 'longitude', required: false },
  ],
  generate: (values) => {
    const lat = values.latitude?.trim()
    const lon = values.longitude?.trim()
    const address = values.address?.trim()

    if (lat && lon) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lon}`)}`
    }

    if (address) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    }

    throw new Error('Enter an address or a latitude/longitude pair.')
  },
}
