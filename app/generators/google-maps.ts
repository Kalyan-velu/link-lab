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
  formatTemplate: 'https://www.google.com/maps/search/?api=1&query={query}',
  formatExplanation: 'Google Maps Search API URL allows deep linking straight to a search result (like coordinates or raw text address). When clicked, this routes directly into the native Google Maps app on mobile or maps.google.com on desktop, centering the map on the queried location.',
}
