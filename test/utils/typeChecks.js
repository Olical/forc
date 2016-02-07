import test from 'tape'
import {isFunction, isIterable, isUndefined} from '../../src/utils/typeChecks'

test('isFunction', (t) => {
  t.plan(2)
  t.ok(isFunction(() => {}))
  t.notOk(isFunction(null))
})

test('isIterable', (t) => {
  t.plan(2)
  t.ok(isIterable([]))
  t.notOk(isIterable(null))
})

test('isUndefined', (t) => {
  t.plan(2)
  t.ok(isUndefined(undefined))
  t.notOk(isUndefined(null))
})
