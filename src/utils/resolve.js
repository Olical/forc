import {isFunction} from './typeChecks'

export default function resolve (value, state) {
  return isFunction(value) ? value(state) : value
}
