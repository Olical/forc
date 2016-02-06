export default function * forc (bindings, body) {
  if (!isIterable(bindings)) {
    throw new Error('The first argument must be iterable')
  }

  if (!isFunction(body)) {
    throw new Error('The second argument must be a function')
  }

  for (const [key, value] of pairs(bindings)) {
    const iter = isFunction(value) ? value(/* bindings... */) : value

    for (const item of iter) {
      yield body({[key]: item})
    }
  }
}

function * pairs (iter) {
  let prev

  for (const item of iter) {
    if (!isUndefined(prev)) {
      yield [prev, item]
      prev = undefined
    } else {
      prev = item
    }
  }

  if (!isUndefined(prev)) {
    throw new Error(`Iterable pairs require an even number of forms (last key was "${prev}")`)
  }
}

function isFunction (value) {
  return typeof value === 'function'
}

function isIterable (value) {
  return value != null && isFunction(value[Symbol.iterator])
}

function isUndefined (value) {
  return typeof value === 'undefined'
}
