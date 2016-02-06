import pairs from './utils/pairs'
import {isIterable, isFunction} from './utils/typeChecks'

export default function * forc (seq, body) {
  if (!isIterable(seq)) {
    throw new Error('The first argument must be iterable')
  }

  if (!isFunction(body)) {
    throw new Error('The second argument must be a function')
  }

  for (const [key, value] of pairs(seq)) {
    const iter = isFunction(value) ? value(/* bindings... */) : value

    for (const item of iter) {
      yield body({[key]: item})
    }
  }
}
