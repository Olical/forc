# forc [![npm version](https://badge.fury.io/js/forc.svg)](http://badge.fury.io/js/forc) [![Build Status](https://travis-ci.org/Olical/forc.svg?branch=master)](https://travis-ci.org/Olical/forc) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard) [![Gitter](https://badges.gitter.im/Olical/forc.svg)](https://gitter.im/Olical/forc?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Clone of [Clojure's for][clj-for] in JavaScript, this gives you powerful list comprehension without a terse API. It's a declarative code-as-data approach which may seem odd to those that haven't written any kind of lisp before.

## Syntax

It pretty much translates to the Clojure API 1-1, including the laziness, you just have to use a function wherever you'd use a binding. Clojure allows you to use [lazy sequences][lazyseq], so `forc` lets you use *any* [iterable][], including generators.

This applies to every single thing you pass or receive from `forc`, including the main expression list. Every "array" you see is actually treated as an iterable so you can generate the entire thing on the fly if you so wish.

This lazy approach should yield huge memory and performance improvements in some situations. It's like everything's a stream internally.

> **WARNING:** `forc` is a generator, it does not return an array. This means you can iterate the results lazily. If you wish to pull all of the values through in one go, you can use `[...result]` on the iterable `forc` returns to resolve everything. I'd recommend using the [iterable][] API though.

### Clojure

```clojure
(for [x (range 1 6)
      :let [y (* x x)
            z (* x x x)]]
  [x y z])

;; ([1 1 1] [2 4 8] [3 9 27] [4 16 64] [5 25 125])
```

### JavaScript

```javascript
forc(['x', [1, 2, 3, 4, 5],
      ':let', ['y', ({x}) => x * x,
               'z', ({x}) => x * x * x]],
  ({x, y, z}) => [x, y, z])

// It returns a generator, but you can resolve it all at once with [...result]
// I'd recommend working with it as an iterable though, keeping things lazy is a good idea.
// [[1, 1, 1], [2, 4, 8], [3, 9, 27], [4, 16, 64], [5, 25, 125]]
```

Using ES6 destructuring and arrow functions obviously makes this bearable, without that it'd be fairly messy to write. The Clojure syntax is still better, but this could help a lot if you're dealing with a lot of nested mapping or filters.

## Usage

This is an ES6 project compiled with [Babel][] but it's compiled to ES5 upon publishing of the package. This means you can use the project with or without Babel, it is not required to use `forc`.

 * Install the package with `npm install --save forc`
 * Import the function...
  * ES6: `import forc from 'forc'`
  * ES5: `var forc = require('forc').default` (note the use of `.default`)
  * Browsers: Use [webpack][] or [browserify][] with your chosen import method
 * Now read the examples found in here, the tests or the [Clojure for][clj-for] documentation to learn how to use everything

If you're planning on using this with ES5 you may want to reconsider. I'm not sure how easy it is to use generators and iterables pre-ES6, but I'd imagine it's not great.

## Examples

These examples can also be found in `./test/examples.js`, you can find a lot in the test directory, actually. I'd recommend having a little read.

They show how `forc` can be a lazy `map` or `filter` for example. When used correctly, for comprehensions can help you flatten nested `map` or `filter` calls over multiple lists.

They can replace the need for nested loops of any kind. Instead of iterating over your `x` and `y` coordinates in a nested way, iterate other both at once.

### Map

```javascript
forc([
  'x', [60, 61, 62, 63, 64]
], ({x}) => String.fromCharCode(x))

// ['<', '=', '>', '?', '@']
```

### Filter

```javascript
function isEven (n) {
  return n % 2 === 0
}

forc([
  'x', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ':when', ({x}) => isEven(x)
], ({x}) => x)

// [2, 4, 6, 8, 10]
```

### Replacing nested loops

```javascript
forc([
  'x', [1, 2, 3],
  'y', [1, 2, 3],
  ':when', ({x, y}) => x !== y
], ({x, y}) => [x, y])

// All grid coordinates that don't share the same x and y
// [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]]
```

## Infinite sequences

```javascript
// An infinite generator of all natural numbers
function * numbers () {
  let n = 0

  while (true) {
    yield n++
  }
}

forc([
  'n', numbers(),
  ':let', ['square', ({n}) => n * n],
  ':while', ({square}) => square < 100
], ({square}) => square)

// Results in only those whos square is < 100
// [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

## Author

[Oliver Caldwell][author-site] ([@OliverCaldwell][author-twitter])

## Unlicenced

Find the full [unlicense][] in the `UNLICENSE` file, but here's a snippet.

>This is free and unencumbered software released into the public domain.
>
>Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

Do what you want. Learn as much as you can. Unlicense more software.

[unlicense]: http://unlicense.org/
[author-site]: http://oli.me.uk/
[author-twitter]: https://twitter.com/OliverCaldwell
[clj-for]: https://clojuredocs.org/clojure.core/for
[iterable]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols
[lazyseq]: http://clojure.org/reference/sequences
[babel]: https://babeljs.io/
[webpack]: https://webpack.github.io/
[browserify]: http://browserify.org/
