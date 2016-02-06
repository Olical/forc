import test from 'tape'
import applyLets from '../../src/utils/applyLets'

test('an empty binding does not alter the result', t => {
  t.plan(1)
  const result = applyLets([], {foo: true})
  t.deepEqual(result, {foo: true})
})

test('bindings can alter the state', t => {
  t.plan(1)
  const result = applyLets(['bar', false], {foo: true})
  t.deepEqual(result, {foo: true, bar: false})
})

test('resolves from previous state', t => {
  t.plan(1)
  const result = applyLets([
    'bar', 10,
    'baz', ({bar}) => bar * 2
  ], {foo: true})
  t.deepEqual(result, {
    foo: true,
    bar: 10,
    baz: 20
  })
})
