<p align="center">
Runtime type checking for typescript & javascript.
</p>

## Introduction

typechecked is a runtime type checker for typescript & javascript. It allows you to define types and check if a value matches that type. In typescript, it enables you to narrow the type of a value based on a type check.

## Installation

```bash
npm install typechecked
```

## Concept

Typechecked is based on the idea of a simple function, that accepts an unknown value and returns it if it matches a given type. If the value does not match the type, an error is thrown.


```typescript
function value(value: unknown): KnownType {
  // throw if value does not match type
  return value as KnownType;
}
```

The library provides a set of these functions for all primitive types, arrays, objects, tuples, unions, intersections, and more. Types that are more domain specific can easily be defined by the consumer.

### Exported functions

```typescript
import { isString } from 'typechecked';
import { isNumber } from 'typechecked';
import { isInteger } from 'typechecked';
import { isBigInt } from 'typechecked';
import { isBoolean } from 'typechecked';
import { isNully } from 'typechecked';
import { isNull } from 'typechecked';
import { isUndefined } from 'typechecked';
import { isSymbol } from 'typechecked';
import { isDate } from 'typechecked';
import { isObject } from 'typechecked';
import { isFunction } from 'typechecked';
```

### Pipe functions

Pipe functions are used to combine multiple type checks into one. They are useful when you want to check if a value matches other conditions apart from just the type. Or if you want to transform a value from the original type before returning it.

```typescript
import { tcpipe, tcpipe_t } from 'typechecked';
```

#### tcpipe

Used when piping functions but the value must be of one type.

```typescript
const validator = tcpipe(
  isString,
  (value) => value.toUpperCase(),
);

const value: string = validator('hello'); // value === 'HELLO'
```

#### tcpipe_t

Useful when the value is transformed to a different type.

```typescript
const validator = tcpipe_t(
  isString,
  isHex,
  (value) => parseInt(value, 16),
);

const value: number = validator('FF1233'); // value === 16716339
```
