/* @flow */

const tag = require('tagged-template-literals')
const trimNewLines = require('trim-newlines')

const indentionRegex = /^\s+/
const allEmpty = /^\s+$/

function trim(strings: string | Array<string>, ...values: Array<any>): string {
  let subject
  let indent = 0
  if (Array.isArray(strings)) {
    subject = tag(strings, values)
  } else if (typeof strings === 'string') {
    subject = strings
    if (typeof values[0] === 'number') {
      ;[indent] = values
    }
  } else {
    throw new Error('Invalid string provided')
  }

  const prepend = ' '.repeat(indent)
  const toReturn = []
  const chunks = subject.split(/\r\n|\n/g)
  let leastIndention = Infinity

  // Detect indention
  for (let i = 0; i < chunks.length; ++i) {
    const chunk = chunks[i]
    const match = chunk.match(indentionRegex)
    const indention = match ? match[0].length : 0
    if (chunk.length && indention < leastIndention && !allEmpty.test(chunk)) {
      leastIndention = indention
    }
  }

  if (leastIndention !== Infinity) {
    for (let i = 0; i < chunks.length; ++i) {
      const chunk = chunks[i].substr(leastIndention)
      toReturn.push(chunk.length ? prepend + chunk : chunk)
    }
  } else {
    for (let i = 0; i < chunks.length; ++i) {
      const chunk = chunks[i]
      toReturn.push(chunk.length ? prepend + chunk : chunk)
    }
  }

  return trimNewLines(toReturn.join('\n'))
}

module.exports = trim
