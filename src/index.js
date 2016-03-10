'use strict'

/* @flow */

const trimNewLines = require('trim-newlines')
const stripIndent = require('strip-indent')

function trim(subject: string): string {
  return stripIndent(trimNewLines(subject))
}

module.exports = trim
