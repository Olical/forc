import test from 'tape'
import pairs from '../../src/utils/pairs'

test('empty -> empty', (t) => {
  t.plan(1)
  const actual = pairs([])
  t.deepEqual([...actual], [])
})

test('single value throws', (t) => {
  t.plan(1)
  t.throws(() => [...pairs(['bad'], () => {})], /even number of forms/)
})

test('one pair', (t) => {
  t.plan(1)
  const actual = pairs(['a', 1])
  t.deepEqual([...actual], [['a', 1]])
})

test('two pairs', (t) => {
  t.plan(1)
  const actual = pairs(['a', 1, 'b', 2])
  t.deepEqual([...actual], [['a', 1], ['b', 2]])
})
