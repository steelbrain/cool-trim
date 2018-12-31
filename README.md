Cool-Trim
========

Cool-Trim is the an npm package to trim strings to have a consistent indention.

## Installation

```sh
npm install --save cool-trim
```

## API

```js
function trim(subject: string, indent: number = 0): string

module.exports = trim
```

## Examples
```js
import trim from 'cool-trim'

trim`
  Top
    Child
  Another Top
` === `Top
  Child
AnotherTop`; // true
```

## License

This project is licensed under the terms of MIT License, see the LICENSE file for more info
