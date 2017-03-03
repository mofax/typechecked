<span>
<img src="https://travis-ci.org/mofax/typechecked.svg?branch=master" />
<span>

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
```

## types you can check

* string
* number
* NaN
* array
* object
* boolean
