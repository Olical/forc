import test from 'tape'
import forc from '../src/forc'

test('function is defined', t => {
  t.plan(1)
  t.equal(typeof forc, 'function')
})
