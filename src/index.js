'use strict'

/* @flow */

const trimNewLines = require('trim-newlines')
const indentionRegex = /^ +/
const allEmpty = /^ +$/

function trim(subject: string): string {
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
      const chunk = chunks[i]
      toReturn.push(chunk.substr(leastIndention))
    }

    return trimNewLines(toReturn.join('\n'))
  }

  return trimNewLines(chunks.join('\n'))
}

module.exports = trim
