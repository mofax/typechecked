# typechecked

type verification for your javascript

check if a variable is of certain type

## installation
```bash
$ npm install typechecked
```
## usage
```js
let typechecked = require('typechecked');

typechecked('str', 'string'); // true
typechecked('str', 'number'); // false
typechecked({}, 'object'); // true
typechecked([], 'array'); // true
typechecked([], 'object'); // false
``
