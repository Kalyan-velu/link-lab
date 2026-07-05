import {describe, expect, it} from 'vitest'
import {generatorRegistry, getGenerator} from '../../app/generators'
import {whatsapp} from '../../app/generators/whatsapp'
import {telegram} from '../../app/generators/telegram'
import {sms} from '../../app/generators/sms'
import {phone} from '../../app/generators/phone'
import {email} from '../../app/generators/email'
import {instagram} from '../../app/generators/instagram'
import {facebook} from '../../app/generators/facebook'
import {linkedin} from '../../app/generators/linkedin'
import {x} from '../../app/generators/x'
import {googleMaps} from '../../app/generators/google-maps'

describe('generator registry', () => {

  it('looks generators up by id', () => {
    expect(getGenerator('whatsapp')).toBe(whatsapp)
    expect(generatorRegistry.telegram).toBe(telegram)
    expect(getGenerator('nonexistent')).toBeUndefined()
  })
})

describe('whatsapp generator', () => {
  it('builds a wa.me link with an encoded message', () => {
    expect(whatsapp.generate({ phone: '+1 (555) 123-4567', message: 'Hi there!' })).toBe(
      'https://wa.me/15551234567?text=Hi%20there!',
    )
  })

  it('omits the text param when there is no message', () => {
    expect(whatsapp.generate({ phone: '+15551234567' })).toBe('https://wa.me/15551234567')
  })
})

describe('telegram generator', () => {
  it('builds a t.me link, stripping a leading @', () => {
    expect(telegram.generate({ username: '@johndoe', message: 'hey' })).toBe('https://t.me/johndoe?text=hey')
  })
})

describe('sms generator', () => {
  it('builds an sms: uri with an encoded body', () => {
    expect(sms.generate({ phone: '555-123-4567', message: 'hello' })).toBe('sms:5551234567?body=hello')
  })
})

describe('phone generator', () => {
  it('builds a tel: uri', () => {
    expect(phone.generate({ phone: '+1 555 123 4567' })).toBe('tel:+15551234567')
  })
})

describe('email generator', () => {
  it('builds a mailto: uri with subject and body', () => {
    expect(email.generate({ email: 'a@b.com', subject: 'Hi', body: 'Hello there' })).toBe(
      'mailto:a@b.com?subject=Hi&body=Hello+there',
    )
  })

  it('builds a bare mailto: uri when subject/body are empty', () => {
    expect(email.generate({ email: 'a@b.com' })).toBe('mailto:a@b.com')
  })
})

describe('instagram / facebook / linkedin generators', () => {
  it('build profile URLs from username', () => {
    expect(instagram.generate({ username: '@jane' })).toBe('https://ig.me/m/jane')
    expect(facebook.generate({ username: 'jane' })).toBe('https://m.me/jane')
    expect(linkedin.generate({ username: 'jane' })).toBe('https://linkedin.com/in/jane')
  })
})

describe('x generator', () => {
  it('builds a tweet intent url with text and via', () => {
    const url = x.generate({ message: 'hello world', username: '@jane' })
    expect(url).toContain('https://twitter.com/intent/tweet?')
    expect(url).toContain('text=hello+world')
    expect(url).toContain('via=jane')
  })
})

describe('google maps generator', () => {
  it('prefers latitude/longitude when provided', () => {
    expect(googleMaps.generate({ latitude: '37.7749', longitude: '-122.4194', address: 'ignored' })).toBe(
      'https://www.google.com/maps/search/?api=1&query=37.7749%2C-122.4194',
    )
  })

  it('falls back to address', () => {
    expect(googleMaps.generate({ address: 'Golden Gate Bridge' })).toBe(
      'https://www.google.com/maps/search/?api=1&query=Golden%20Gate%20Bridge',
    )
  })

  it('throws when neither address nor coordinates are provided', () => {
    expect(() => googleMaps.generate({})).toThrow()
  })
})
