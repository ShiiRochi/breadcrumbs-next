# Breadcrumbs for NextJS


## Behind The Scenes

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
