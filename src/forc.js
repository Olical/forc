export default function * forc (bindings, body) {
  for (const [key, value] of pairs(bindings)) {
    const iter = isFunction(value) ? value(/* bindings... */) : value

    for (const item of iter) {
      yield body({[key]: item})
    }
  }
}

function isFunction (value) {
  return typeof value === 'function'
}

function isUndefined (value) {
  return typeof value === 'undefined'
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
