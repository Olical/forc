import resolve from './resolve'
import pairs from './pairs'

export default function applyLets (lets, state) {
  for (const [key, value] of pairs(lets)) {
    state[key] = resolve(value, state)
  }

  return state
}
