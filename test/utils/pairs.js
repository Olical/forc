import test from 'tape'
import pairs from '../../src/utils/pairs'

test('empty -> empty', t => {
  t.plan(1)
  const result = pairs([])
  t.deepEqual([...result], [])
})

test('single value throws', t => {
  t.plan(1)
  t.throws(() => [...pairs(['bad'], () => {})], /even number of forms/)
})

test('one pair', t => {
  t.plan(1)
  const result = pairs(['a', 1])
  t.deepEqual([...result], [['a', 1]])
})

test('two pairs', t => {
  t.plan(1)
  const result = pairs(['a', 1, 'b', 2])
  t.deepEqual([...result], [['a', 1], ['b', 2]])
})
