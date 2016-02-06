import pairs from './utils/pairs'
import {isIterable, isFunction} from './utils/typeChecks'

export default function * forc (seq, body) {
  if (!isIterable(seq)) {
    throw new Error('The first argument must be iterable')
  }

  if (!isFunction(body)) {
    throw new Error('The second argument must be a function')
  }

  for (const state of states(pairs(seq))) {
    yield body(state)
  }
}

function * states (paired, state) {
  const [head, ...tail] = paired

  if (head) {
    state = state || {}

    const [key, value] = head
    const iter = isFunction(value) ? value(state) : value

    for (const item of iter) {
      state[key] = item
      yield* states(tail, state)
    }
  } else if (state) {
    yield state
  }
}
