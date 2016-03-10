'use babel'

import trim from '../'

describe('Trim', function() {
  it('removes leading and ending newlines', function() {
    expect(trim(`
      Hey

      `)).toBe('Hey')
  })
  it('removes extra whitespaces properly', function() {
    expect(trim(`
      Hey
      Man
    `)).toBe('Hey\nMan')
  })
  it('acts as we expect it to', function() {
    expect(trim(`
      Hey
        Man
      `)).toBe('Hey\n  Man')
  })
  it('is smart', function() {
    expect(trim('Hey\nMan')).toBe('Hey\nMan')
    expect(trim('Hey\n  Man')).toBe('Hey\n  Man')
    expect(trim('  Hey\nMan')).toBe('  Hey\nMan')
    expect(trim('Main')).toBe('Main')
  })
})
