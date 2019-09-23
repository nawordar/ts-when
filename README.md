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

[when-switch]: https://github.com/kube/when-switch
