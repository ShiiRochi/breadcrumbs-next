# Breadcrumbs for NextJS

## Table of contents

- [Breadcrumbs for NextJS](#breadcrumbs-for-nextjs)
    - [Installation](#installation)
    - [Behind The Scenes](#behind-the-scenes)
    - [Contents](#contents)
    - [Type Aliases](#type-aliases)
    - [Components](#components)
    - [Functions](#functions)
    - [Testing](#testing)
    - [TODOs](#backlog)

## Installation
```shell
npm install breadcrumbs-next
```
```shell
yarn install breadcrumbs-next
```
```shell
pnpm install breadcrumbs-next
```


## Behind The Scenes
<details>
    <summary>Click to read!</summary>

Imagine your app having the following routes:
1. `/momentum`
2. `/projects/[projectId]`
3. `/[[…slug]]`
4. `/users/[userId]/[[…stuff]]`
5. `/users/[userId]/[[…slug]]?t=record`
6. `/users?t=record`
7. `/users/[userId]?t=record`

Last three examples also include URL parameters, which can be used to construct breadcrumbs.
For example, when you have a page consisting from another set of tabs,
but you don't want to create another route for that.

All of those examples can be transformed to the following formats (lets omit `Home` element in resulting breadcrumbs):

| Pattern                                  | Breadcrumbs                                     | Example URL                               |
|------------------------------------------|-------------------------------------------------|-------------------------------------------|
| `/momentum`                              | Momentum                                        | =                                         |
| `/profile?t=records`                     | Profile > Records                               | =                                         |
| `/projects/[projectId]`                  | Projects > "Grammar"                            | /projects/17                              |
| `/[[…slug]]`                             | Russia > Moscow > Subway > Kommunarka           | /russia/moscow/subway/kommunarka          |
| `/users/[userId]/[[…stuff]]`             | Users > Pavel > Deliveries > Yandex > Lavka     | /users/132/deliveries/yandex/lavka        |
| `/users/[userId]/[[…slug]]?t=records`[1] | Users > Pavel > Deliveries > Dashboard > Record | /users/132/deliveries/dashboard?t=records |
| `/users/[userId]?t=records`              | Users > Pavel > Records                         | /users/132?t=records                      |

[1] - Search params always are taken last, because change of URL (w/o params) is the same as opening another page,
thus even having the same params set int the URL doesn't mean they should go in the beginning.
They are behaviour modifiers of the page, but not its primary descriptor.
</details>

## Contents

### Type Aliases

- [BreadCrumb](#breadcrumb)
- [CrumbComponentProps](#crumbcomponentprops)
- [NextBreadcrumbsProps](#nextbreadcrumbsprops)
- [GetDefaultTextGenerator](#getdefaulttextgenerator)
- [GetTextGenerator](#gettextgenerator)
- [TextGeneratorFn](#textgeneratorfn)

### Components

- [NextBreadcrumbs](#nextbreadcrumbs)

### Functions

- [createNextCrumbComponent](#createnextcrumbcomponent)

## Type Aliases

### BreadCrumb

#### Type declaration

| Name            | Type                                            |
|:----------------|:------------------------------------------------|
| `href`          | `string`                                        |
| `text`          | `string`                                        |
| `textGenerator` | `null` or [`TextGeneratorFn`](#textgeneratorfn) |

___

### CrumbComponentProps

#### Type Declaration

| Name            | Type                                              |
|:----------------|:--------------------------------------------------|
| `href`          | `string`                                          |
| `isFirst`       | `boolean`                                         |
| `isLast`        | `boolean`                                         |
| `text`          | `string`                                          |
| `textGenerator` | ``null`` or [`TextGeneratorFn`](#textgeneratorfn) |

___

### GetDefaultTextGenerator

#### Type declaration

▸ (`config`) => `string`

##### Parameters

| Name                       | Type                      |
|:---------------------------|:--------------------------|
| `config`                   | `Object`                  |
| `config.href`              | `string`                  |
| `config.isCatchAllSubpath` | `boolean`                 |
| `config.paramIndex`        | `number`                  |
| `config.paramName`         | `string`                  |
| `config.isCatchAllSubpath` | `boolean`                 |
| `config.paramSlugIndex`    | `null or number`          |
| `config.paramValue`        | `string`                  |
| `config.query`             | `NextRouter`[``"query"``] |

___

### GetTextGenerator

#### Type declaration

▸ (`config`) => ``null`` | [`TextGeneratorFn`](#textgeneratorfn)

##### Parameters

| Name                       | Type                      |
|:---------------------------|:--------------------------|
| `config`                   | `Object`                  |
| `config.href`              | `string`                  |
| `config.isCatchAllSubpath` | `boolean`                 |
| `config.paramIndex`        | `number`                  |
| `config.paramName`         | `string`                  |
| `config.paramSlugIndex`    | `null or number`          |
| `config.paramValue`        | `string`                  |
| `config.query`             | `NextRouter`[``"query"``] |

___

### NextBreadcrumbsProps

#### Type declaration

| Name                         | Type                                                  |
|:-----------------------------|:------------------------------------------------------|
| `Container`                  | `string` or `FC<{children: ReactNode}>`               |
| `Crumb`                      | `FC<`[`CrumbComponentProps`](#crumbcomponentprops)`>` |
| `getDefaultTextGenerator?`   | [`GetDefaultTextGenerator`](#getdefaulttextgenerator) |
| `getTextGenerator?`          | [`GetTextGenerator`](#gettextgenerator)               |
| `homeText?`                  | `string`                                              |

#### Used in:

- [NextBreadcrumbs](#nextbreadcrumbs)

___

### TextGeneratorFn

#### Type declaration

▸ () => `string` | `Promise<string>`

#### Used in:

- [GetTextGenerator](#gettextgenerator)

## Components

### NextBreadcrumbs

#### Props

| Name         | Type                                            |
|:-------------|:------------------------------------------------|
| `{...props}` | [`NextBreadcrumbsProps`](#nextbreadcrumbsprops) |

___

## Functions

### createNextCrumbComponent

#### Parameters

| Name        | Type                                                                         |
|:------------|:-----------------------------------------------------------------------------|
| `Component` | `FC<Omit<`[`CrumbComponentProps`](#crumbcomponentprops)`, "textGenerator">>` |

#### Returns

`FC`<[`CrumbComponentProps`](modules.md#crumbcomponentprops)>

## Testing

```shell
yarn install-peers
yarn vitest
```

## TODOs

- [ ] add support for query params to be items of breadcrumbs
- [ ] add all required tests

