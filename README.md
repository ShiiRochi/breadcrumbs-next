# Breadcrumbs for NextJS

## Table of contents

- [Breadcrumbs for NextJS](#breadcrumbs-for-nextjs)
    - [Behind The Scenes](#behind-the-scenes)
    - [Contents](#contents)
    - [Type Aliases](#type-aliases)
    - [Components](#components)
    - [Functions](#functions)

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

- BreadCrumb
- CrumbProps
- GetDefaultTextGenerator
- GetTextGenerator
- NextBreadcrumbsProps
- TextGeneratorFn

### Components

- NextBreadcrumbs

### Functions

- createNextCrumbComponent

## Type Aliases

### BreadCrumb

Ƭ **BreadCrumb**: `Object`

#### Type declaration

| Name            | Type                        |
|:----------------|:----------------------------|
| `href`          | `string`                    |
| `text`          | `string`                    |
| `textGenerator` | ``null or TextGeneratorFn`` |

___

### CrumbProps

Ƭ **CrumbProps**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Type declaration

| Name     | Type      |
|:---------|:----------|
| `href`   | `string`  |
| `isLast` | `boolean` |
| `text`   | `string`  |

___

### GetDefaultTextGenerator

Ƭ **GetDefaultTextGenerator**: (`config`: { `href`: `string` ; `paramIndex`: `number` ; `paramName`: `string` ; `paramSlugIndex`: `number` ; `paramValue`: `string` ; `query`: `NextRouter`[``"query"``]  }) => `string`

#### Type declaration

▸ (`config`): `string`

##### Parameters

| Name                       | Type                      |
|:---------------------------|:--------------------------|
| `config`                   | `Object`                  |
| `config.href`              | `string`                  |
| `config.paramIndex`        | `number`                  |
| `config.paramName`         | `string`                  |
| `config.isCatchAllSubpath` | `boolean`                 |
| `config.paramSlugIndex`    | `null or number`          |
| `config.paramValue`        | `string`                  |
| `config.query`             | `NextRouter`[``"query"``] |

##### Returns

`string`

___

### GetTextGenerator

Ƭ **GetTextGenerator**: (`config`: { `href`: `string` ; `paramIndex`: `number` ; `paramName`: `string` ; `paramSlugIndex`: `number` ; `paramValue`: `string` ; `query`: `NextRouter`[``"query"``]  }) => ``null`` \| [`TextGeneratorFn`](modules.md#textgeneratorfn)

#### Type declaration

▸ (`config`): ``null`` \| [`TextGeneratorFn`](modules.md#textgeneratorfn)

##### Parameters

| Name                       | Type                      |
|:---------------------------|:--------------------------|
| `config`                   | `Object`                  |
| `config.href`              | `string`                  |
| `config.paramIndex`        | `number`                  |
| `config.paramName`         | `string`                  |
| `config.isCatchAllSubpath` | `boolean`                 |
| `config.paramSlugIndex`    | `null or number`          |
| `config.paramValue`        | `string`                  |
| `config.query`             | `NextRouter`[``"query"``] |

##### Returns

``null`` | `TextGeneratorFn`

___

### NextBreadcrumbsProps

Ƭ **NextBreadcrumbsProps**: `Object`

#### Type declaration

| Name                         | Type                                     |
|:-----------------------------|:-----------------------------------------|
| `Container`                  | `string` or `FC<{children: ReactNode}\>` |
| `Crumb`                      | `FC<CrumbProps>`                         |
| `getDefaultTextGenerator?`   | `GetDefaultTextGenerator`                |
| `getTextGenerator?`          | `GetTextGenerator`                       |
| `homeText?`                  | `string`                                 |
| `useQueryParamsAsPathItems?` | `string[]`                               |

___

### TextGeneratorFn

Ƭ **TextGeneratorFn**: () => `Promise`<`string`\>

#### Type declaration

▸ (): `Promise`<`string`\>

##### Returns

`Promise`<`string`\>

## Components

### NextBreadcrumbs

▸ **NextBreadcrumbs**(`«destructured»`): `JSX.Element`

#### Parameters

| Name             | Type                   |
|:-----------------|:-----------------------|
| `«destructured»` | `NextBreadcrumbsProps` |

#### Returns

`JSX.Element`

___

## Functions

### createNextCrumbComponent

▸ **createNextCrumbComponent**(`Component`): `FC<{ text: string ; textGenerator: null | TextGeneratorFn  }\>`

#### Parameters

| Name        | Type                           |
|:------------|:-------------------------------|
| `Component` | `FC<{ children: ReactNode }\>` |

#### Returns

`FC<{ text: string; textGenerator: null | TextGeneratorFn }\>`

## Backlog
Here I would place any ideas to make in the future.
- [ ] add support for query params to be items of breadcrumbs
