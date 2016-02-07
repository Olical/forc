import test from 'tape'
import resolve from '../../src/utils/resolve'

test('a value returns a value', (t) => {
  t.plan(1)
  const expected = 'test'
  const actual = resolve(expected)
  t.strictEqual(actual, expected)
})

test('a function returns the product called with the state', (t) => {
  t.plan(1)
  const input = 'test'
  const expected = 'TEST'
  const state = {input}
  const fn = ({input}) => input.toUpperCase()
  const actual = resolve(fn, state)
  t.strictEqual(actual, expected)
})
