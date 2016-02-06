import {isUndefined} from './typeChecks'

export default function * pairs (iter) {
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

