export function isFunction (value) {
  return typeof value === 'function'
}

export function isIterable (value) {
  return value != null && isFunction(value[Symbol.iterator])
}

export function isUndefined (value) {
  return typeof value === 'undefined'
}
