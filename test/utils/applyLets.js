import test from 'tape'
import applyLets from '../../src/utils/applyLets'

test('an empty binding does not alter the result', (t) => {
  t.plan(1)
  const actual = applyLets([], {foo: true})
  t.deepEqual(actual, {foo: true})
})

test('bindings can alter the state', (t) => {
  t.plan(1)
  const actual = applyLets(['bar', false], {foo: true})
  t.deepEqual(actual, {foo: true, bar: false})
})

test('resolves from previous state', (t) => {
  t.plan(1)
  const actual = applyLets([
    'bar', 10,
    'baz', ({bar}) => bar * 2
  ], {foo: true})
  t.deepEqual(actual, {
    foo: true,
    bar: 10,
    baz: 20
  })
})

test('uneven lets throw', (t) => {
  t.plan(1)
  t.throws(() => {
    applyLets(['bar'], {foo: true})
  }, /even number of forms/)
})
