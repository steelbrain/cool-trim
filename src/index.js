'use strict'

/* @flow */

const trimNewLines = require('trim-newlines')
const indentionRegex = /^ +/
const allEmpty = /^ +$/

function trim(subject: string, indent: number = 0): string {
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
