import test from 'tape'
import forc from '../src/forc'

test('map', (t) => {
  t.plan(1)
  const actual = forc([
    'x', [60, 61, 62, 63, 64]
  ], ({x}) => String.fromCharCode(x))
  t.deepEqual([...actual], ['<', '=', '>', '?', '@'])
})

test('filter', (t) => {
  function isEven (n) {
    return n % 2 === 0
  }

  t.plan(1)
  const actual = forc([
    'x', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ':when', ({x}) => isEven(x)
  ], ({x}) => x)
  t.deepEqual([...actual], [2, 4, 6, 8, 10])
})

test('nested loops', (t) => {
  t.plan(1)
  const actual = forc([
    'x', [1, 2, 3],
    'y', [1, 2, 3],
    ':when', ({x, y}) => x !== y
  ], ({x, y}) => [x, y])
  t.deepEqual([...actual], [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]])
})

test('infinite sequences', (t) => {
  function * numbers () {
    let n = 0

    while (true) {
      yield n++
    }
  }

  t.plan(1)
  const actual = forc([
    'n', numbers(),
    ':let', ['square', ({n}) => n * n],
    ':while', ({square}) => square < 100
  ], ({square}) => square)
  t.deepEqual([...actual], [0, 1, 4, 9, 16, 25, 36, 49, 64, 81])
})
