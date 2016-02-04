# forc

> I've only written the tests so far (a lot of them), no real code. That's next.

Clone of [Clojure's for][clj-for] in JavaScript, this gives you powerful list comprehension without a terse API. It's a declarative code-as-data approach which may seem odd to those that haven't written any kind of lisp before.

## Syntax

It pretty much translates to the Clojure API 1-1, you just have to use a function wherever you'd use a binding. Clojure allows you to use lazy sequences, so `forc` lets you use any iterable, including generators.

### Clojure

```clojure
(for [x (range 1 6)
      :let [y (* x x)
            z (* x x x)]]
  [x y z])

// ([1 1 1] [2 4 8] [3 9 27] [4 16 64] [5 25 125])
```

### JavaScript

```javascript
forc(['x', [1, 2, 3, 4, 5],
      ':let', ['y', ({x}) => x * x,
               'z', ({x}) => x * x * x]],
  ({x, y, z}) => [x, y, z])

// [[1, 1, 1], [2, 4, 8], [3, 9, 27], [4, 16, 64], [5, 25, 125]]
```

Using ES6 destructuring and arrow functions obviously makes this bearable, without that it'd be fairly messy to write. The Clojure syntax is still better, but this could help a lot if you're dealing with a lot of nested mapping or filters.

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
