# Lobe

> This is an unofficial package!

Deep learning made easy with [Lobe.ai](https://lobe.ai/):

```js
const selfie = 'data:image/png;base64,iVBORw0KGgoAtJ2sAch...';
const results = await lobe({ selfie, object: 'hand' }, MODEL);
console.log(results);
// { emoji: '✌️', confidences: [['✌️', 0.9], ['👍', 0.05], ...] }
```

> Note: this is a proof of concept since I'd love to work with Lobe!






## Gettings started

To start using it, first import it in your preferred way and **add your key**:

```js
// Node.js style
const lobe = require('lobe');
lobe.key = process.env.LOBE_KEY;
lobe(...).then(console.log);
// { emoji: '✌️', confidences: [['✌️', 0.9], ['👍', 0.05], ...] }
```

```js
// React/ES7 Modules style
import lobe from 'lobe';
lobe.key = 'LOBE_KEY';
lobe(...).then(console.log);
// { emoji: '✌️', confidences: [['✌️', 0.9], ['👍', 0.05], ...] }
```

```html
<!-- Old school; we follow semver for versioning -->
<script src="https://cdn.jsdelivr.net/npm/lobe@0.1"></script>
<script>
  lobe.key = 'LOBE_KEY';
  lobe(...).then(console.log)
  // { emoji: '✌️', confidences: [['✌️', 0.9], ['👍', 0.05], ...] }
</script>
```

Now you are ready to go and you can easily start evaluating your images:

```js
const selfie = 'data:image/png;base64,iVBORw0KGgoA...';
const results = await lobe({ selfie, object: 'hand' }, MODEL);
console.log(results);
// { emoji: '✌️', confidences: [['✌️', 0.9], ['👍', 0.05], ...] }```
```






## lobe(options, model) => Promise

The main function accepts one or two parameters and returns a promise. This promise can be resolved successfully if everything works, or it'd throw an error otherwise. API:

- [`options`](#options): a plain object with your inputs for the defined model.
- [`model`](#model): the identification for the model you are working with. Optional if already set globally.
- [*returns Promise*](#return-value): it returns a promise that will be resolved to the output if successful.



### `options`

The options will depend on your model, but it will always be a plain object with keys and string values:

```js
const selfie = 'data:image/png;base64,iVBORw0KGgoA...';
const results = await lobe({ selfie, object: 'hand' });
console.log(results);
// { emoji: '✌️', confidences: [['✌️', 0.9], ['👍', 0.05], ...] }
```

> Note: your images have to be [encoded in `base 64`](https://stackoverflow.com/a/20285053/938236) for now.


For instance, let's see for the pipe example:

```js
const image = 'data:image/png;base64,iVBORw0KGgoA...';
const results = await lobe({ image });
console.log(results);
// { gallons: 3450, boxes: [["Pipe", [0.51, 0.11, ...]], ["Anchor", [...]]] }
```



### `model`

This option will identify the dataset that you are working with:

```js
lobe({ selfie, object: 'hand' }, '2342-4545-3234');
```

It can be set globally if you are going to work with a single context for all your application:

```js
lobe.model = '2342-4545-3234';
lobe({ selfie, object: 'hand' }).then(...);
```

The argument takes preference in case you have both set globally and locally.






### return value

The return value is a promise that resolves to the output of the request:

```js
lobe({ selfie, object: 'hand' }).then(out => console.log(out));
```

It can be used with async/await for the best results:

```js
const result = await lobe({ selfie, object: 'hand' });
```

Make sure to check for errors:

```js
try {
  const result = await lobe({ selfie, object: 'hand' });
} catch (error) {
  manage_somehow(error);
}
```
