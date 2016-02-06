import test from 'tape'
import forc from '../src/forc'

test('definition', t => {
  t.plan(1)
  t.equal(typeof forc, 'function', 'forc is a function')
})

test('empty expressions yield empty results', t => {
  t.plan(1)
  const actual = forc([], () => {
    t.fail('should not be called')
  })
  t.deepEqual([...actual], [], 'empty result list')
})

test('bad arguments throw', t => {
  t.plan(2)
  t.throws(() => [...forc(null, () => {})], /first argument must be iterable/, 'first must be iterable')
  t.throws(() => [...forc([], null)], /second argument must be a function/, 'second must be a function')
})

test('simple incrementing expression', t => {
  t.plan(1)
  const actual = forc([
    'x', () => [10, 20, 30]
  ], ({x}) => x + 1)
  t.deepEqual([...actual], [11, 21, 31], 'values were incremented')
})

test('shorthand incrementing expression (no function)', t => {
  t.plan(1)
  const actual = forc([
    'x', [10, 20, 30]
  ], ({x}) => x + 1)
  t.deepEqual([...actual], [11, 21, 31], 'values were incremented')
})

test('multiple expressions', t => {
  t.plan(1)
  const actual = forc([
    'x', ['a', 'b', 'c'],
    'y', [1, 2, 3]
  ], ({x, y}) => [x, y])
  t.deepEqual([...actual], [['a', 1], ['a', 2], ['a', 3], ['b', 1], ['b', 2], ['b', 3], ['c', 1], ['c', 2], ['c', 3]], 'values were zipped up')
})

test('using previous expressions', t => {
  t.plan(1)
  const actual = forc([
    'x', [1, 2, 3],
    'y', ({x}) => [x + 1]
  ], ({x, y}) => [x, y])
  t.deepEqual([...actual], [[1, 2], [2, 3], [3, 4]], 'values were zipped and incremented')
})

test('let', t => {
  t.plan(1)
  const actual = forc([
    'x', [1, 2, 3],
    ':let', ['y', ({x}) => x + 1]
  ], ({x, y}) => [x, y])
  t.deepEqual([...actual], [[1, 2], [2, 3], [3, 4]], 'values were zipped and added')
})

test('let and when', t => {
  t.plan(1)
  const actual = forc([
    'x', [0, 1, 2, 3, 4, 5],
    ':let', ['y', ({x}) => x * 3],
    ':when', ({y}) => y % 2 === 0
  ], ({y}) => y)
  t.deepEqual([...actual], [0, 6, 12], 'multiplied by 3 then even are returned')
})

test('when', t => {
  t.plan(1)
  const actual = forc([
    'x', [0, 1, 2],
    'y', [0, 1, 2],
    ':when', ({x, y}) => x !== y
  ], ({x, y}) => [x, y])
  t.deepEqual([...actual], [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]])
})

test('while', t => {
  t.plan(1)
  const actual = forc([
    'x', [0, 1, 2],
    'y', [0, 1, 2],
    ':while', ({x, y}) => x !== y
  ], ({x, y}) => [x, y])
  t.deepEqual([...actual], [[1, 0], [2, 0], [2, 1]])
})

test('let', t => {
  t.plan(1)
  const actual = forc([
    'x', [1, 2, 3, 4, 5],
    ':let', ['y', ({x}) => x * x,
             'z', ({x}) => x * x * x]
  ], ({x, y, z}) => [x, y, z])
  t.deepEqual([...actual], [[1, 1, 1], [2, 4, 8], [3, 9, 27], [4, 16, 64], [5, 25, 125]])
})

test('uneven let', t => {
  t.plan(1)
  t.throws(() => {
    [...forc([
      'x', [1],
      ':let', ['bad']
    ], ({x}) => x)]
  }, /even number of forms/, 'needs an even number of binding forms')
})

test('empty let', t => {
  t.plan(1)
  const actual = forc([
    'x', [1, 2, 3, 4, 5],
    ':let', []
  ], ({x}) => x + 1)
  t.deepEqual([...actual], [2, 3, 4, 5, 6])
})

test('passing generators', t => {
  function * genRange (n) {
    for (let i = 0; i <= n; i++) {
      yield i
    }
  }

  t.plan(2)
  t.deepEqual([...genRange(4)], [0, 1, 2, 3, 4], 'generator generated 0 -> 4')
  const actual = forc([
    'x', genRange(4)
  ], ({x}) => x + 1)
  t.deepEqual([...actual], [1, 2, 3, 4, 5], 'forc passed the generated values through')
})
