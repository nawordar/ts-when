[![CircleCI](https://circleci.com/gh/nawordar/ts-when.svg?style=shield)](https://circleci.com/gh/nawordar/ts-when)
[![codecov](https://codecov.io/gh/nawordar/ts-when/branch/master/graph/badge.svg)](https://codecov.io/gh/nawordar/ts-when)
[![Maintainability](https://api.codeclimate.com/v1/badges/acbaf24c14a3478dc54b/maintainability)](https://codeclimate.com/github/nawordar/ts-when/maintainability)
[![devDependencies Status](https://david-dm.org/nawordar/ts-when/dev-status.svg)](https://david-dm.org/nawordar/ts-when?type=dev)
[![NPM version](https://badge.fury.io/js/ts-when.svg)](http://badge.fury.io/js/ts-when)

<h1 align="center">ts-when</h1>

<h3 align="center">
  JavaScript functional implementation of switch/case written in TypeScript
</h3>

## Note

This is a fork of a great library [when-switch] which seems no longer maintained.

If you would like a similar behaviour built in JavaScript, please support the
[pattern matching proposal](https://github.com/tc39/proposal-pattern-matching)!
This extension will never be as good as the native support.

Table of contents
=================

* [ts-when](#ts-when)
   * [Table of contents](#table-of-contents)
   * [Usage](#usage)
      * [Strict Equality](#strict-equality)
      * [Assertion-based Matching](#assertion-based-matching)
      * [Structural Matching](#structural-matching)
         * [Regular Expressions](#regular-expressions)
         * [Custom Type Guard Matcher](#custom-type-guard-matcher)
   * [TypeScript](#typescript)
      * [Union types](#union-types)
   * [Planned](#planned)
      * [Creating custom `when`](#creating-custom-when)

## Usage

You can use ts-when in a functional way, using a single expression:

### Strict Equality

```js
import when from 'ts-switch'

const getDrinkPrice = drink =>
  when(drink)
    .is('Coke', 1.5)
    .is('Pepsi', 1.8)
    .else(2.0)
```

### Assertion-based Matching

You can return a value when given assertion is correct

```ts
const x = when
  .true(someVariable === true, "some variable is true")
  .else("some variable is false")

```

### Structural Matching

You can use `match` method with any object exposing a `test` method.

#### Regular Expressions

```js
const getCaseStyle = text =>
  when(text)
    .match(/^([A-Z][a-z]*)+$/, 'UpperCamelCase')
    .match(/^([a-z]+[A-Z][a-z]*)+$/, 'LowerCamelCase')
    .match(/^([a-z]+_[a-z]+)+$/, 'SnakeCase')
    .else('Unknown')
```

#### Custom Type Guard Matcher

```ts
type SpaceObject = { x: number; y: number; z: number }
type Cube = SpaceObject & { width: number }
type Sphere = SpaceObject & { radius: number }

const SpaceObjectSchema = {
  test: (_: any): _ is SpaceObject =>
    typeof _.x === 'number' &&
    typeof _.y === 'number' &&
    typeof _.z === 'number'
}

const CubeSchema = {
  test: (_: any): _ is Cube =>
    typeof _.width === 'number' && SpaceObjectSchema.test(_)
}

const SphereSchema = {
  test: (_: any): _ is Sphere =>
    typeof _.radius === 'number' && SpaceObjectSchema.test(_)
}

const getObjectVolume = (object: SpaceObject) =>
  // Each match handler will receive correct static type
  when(object)
    .match(CubeSchema, cube => cube.width ** 3)
    .match(SphereSchema, sphere => Math.PI * 3 / 4 * sphere.radius ** 3)
    .else(_ => null)
```

> `match` and `is` can both be used in the same `when` expression.

## TypeScript

`when` is fully compatible with TypeScript, and will check the types you return in each `is` expression:

```ts
const getDrinkPrice = (drink: 'Pepsi' | 'Coke' | 'Orangina'): number =>
  when(drink)
    .is('Coke', 1.5)
    .is('Pepsi', 1.8)
    .else(2.0)
```

Here the return type of the `when` expression will be `number`

### Union types

For each `is` or `else` expression added to the current `when` expression, the type is added as an union to the previous type.

```ts
const getDrinkPrice = (drink: 'Pepsi' | 'Coke' | 'Orangina') =>
  when(drink)
    .is('Coke', 1.5)
    .is('Pepsi', true)
    .else('Free')
```

Here the return type of `getDrinkPrice` expression will be `number | string | boolean`

## Planned

### Creating custom `when`

Currently new features can only be added by including them in a library or using custom matcher if it's enough for the task.\
Another problem is that adding new features to the library requires a lot of boilerplate and risks breaking another functionality.

I am currently trying to solve both problems by adding a '`when` creator':
```ts
const customWhen = createWhen({
  dynamic: {
    is: {
      test: (subject: any, matcher: any) =>  subject === matcher,
    },
  },
  static: {
    true: {
      test: (subject: any, matcher: any) =>  subject === matcher,
    },
  },
  hybrid: {
    matches: {
      test: (subject, matcher: Matcher) => matcher.test(subject),
    },
  },
});
```
Which would then be used as follows:
```ts
const x = customWhen(2)
  .is(2, () => "Two is two!") // createWhen() automatically created method with two arguments
  // .true() is not available, as it is static-only method
  .matches(/\d+/, "Two is a number!") // result can always be a lazily evaluated function or a constant
  .matches("test", /\w+/, "'Test' is a word!") // .matches() can be used either dynamically or statically
  .else(":(");
  
const y = customWhen
  // .is() is not available, as it is dynamic-only method
  .true(2, 2, () => "Two is two!")
  .matches(2, /d+/, "Two is a number!")
  .else(":(");
```
I am now investigating if there are any drawbacks and if Typescript's type system is sufficient for such dynamically created functions.


[when-switch]: https://github.com/kube/when-switch
