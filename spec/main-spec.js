import test from 'ava'
import trim from '..'

test('removes leading and ending newlines', function(t) {
  t.is(
    trim(`
      Hey

      `),
    'Hey',
  )
})
test('removes extra whitespaces properly', function(t) {
  t.is(
    trim(`
      Hey
      Man
    `),
    'Hey\nMan',
  )
})
test('acts as we expect it to', function(t) {
  t.is(
    trim(`
      Hey
        Man
      `),
    'Hey\n  Man',
  )
})
test('is smart', function(t) {
  t.is(trim('Hey\nMan'), 'Hey\nMan')
  t.is(trim('Hey\n  Man'), 'Hey\n  Man')
  t.is(trim('  Hey\nMan'), '  Hey\nMan')
  t.is(trim('Main'), 'Main')
})
test('adds indention on request', function(t) {
  t.is(
    trim(
      `
      Everything is
        awesome
      `,
      2,
    ),
    '  Everything is\n    awesome',
  )
})
test('works well with tagged templates', function(t) {
  t.is(
    trim`
      Everything is
        awesome
    `,
    'Everything is\n  awesome',
  )
  t.is(
    trim`
      Come on
      ${'Dolly'}
        Come on
    `,
    'Come on\nDolly\n  Come on',
  )
})
test('it works with tab characters', function(t) {
  t.is(
    trim`
		Everything is
		awesome
	`,
    'Everything is\nawesome',
  )
  t.is(
    trim`
		Everything is
			awesome
		`,
    'Everything is\n\tawesome',
  )
  t.is(
    trim`
	  Everything is
		awesome
	 `,
    ' Everything is\nawesome',
  )
})
