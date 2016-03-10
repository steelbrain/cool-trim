'use strict'

/* @flow */

function trim(subject: string, padding: string = '  '): string {
  const toReturn = []
  const chunks = subject.split(/\r\n|\n/g)

  toReturn.push(chunks[0].trim())

  for (let i = 1; i < chunks.length; i++) {
    let chunk = chunks[i].trim()
    if (chunk.length) {
      chunk = padding + chunk
    }
    toReturn.push(chunk)
  }

  return toReturn.join('\n')
}

module.exports = trim
