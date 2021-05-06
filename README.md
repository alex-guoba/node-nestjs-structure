# node-nestjs-structure

Node.js framework NestJS project structure

## TODO:

1. 更新到新版本nest框架
2. 单测fix
3. MVC sample
- 引入模板引擎hbs
4. [use alias](https://medium.com/slackernoon/use-typescript-aliases-to-clean-up-your-import-statements-7210b7ec2af1)
- import改为别名导入，避免太多相对路径问题。
5. 改为webpack打包，支持更加灵活的运行模式。避免对nest-cli的强依赖。
- webpack无法识别路径，TypeORM entry加载改为[自动](https://docs.nestjs.com/techniques/database#auto-load-entities)。


## Configuration

1. Create a `.env` file
    - Rename the [.env.sample](.env.sample) file to `.env` to fix it.
2. Edit env config
    - Edit the file in the [config](src/config) folder.
    - `default`, `development`, `production`, `test`

## Installation

```sh
# 1. node_modules
npm ci
# 2. When import entities from an existing database
npm run entity
```

If you use multiple databases, [modify them.](bin/entity.js#L45)

## Development

```sh
npm run start:dev
```

Run [http://localhost:3000](http://localhost:3000)

## Test

```sh
npm test # exclude e2e
npm run test:e2e
```

## Production

```sh
# define NODE_ENV and PORT
npm run build
# NODE_ENV=production PORT=8000 node dist/app
node dist/app
# OR
npm start
```

## Folders

```js
+-- bin // Custom tasks
+-- dist // Source build
+-- public // Static Files
+-- src
|   +-- config // Environment Configuration
|   +-- entity // TypeORM Entities generated by `typeorm-model-generator` module
|   +-- auth // Authentication
|   +-- common // Global Nest Module
|   |   +-- controllers // Nest Controllers
|   |   +-- decorators // Nest Decorators
|   |   +-- dto // DTO (Data Transfer Object) Schema, Validation
|   |   +-- filters // Nest Filters
|   |   +-- guards // Nest Guards
|   |   +-- interceptors // Nest Interceptors
|   |   +-- interfaces // TypeScript Interfaces
|   |   +-- middleware // Nest Middleware
|   |   +-- pipes // Nest Pipes
|   |   +-- providers // Nest Providers
|   |   +-- * // models, repositories, services...
|   +-- shared // Shared Nest Modules
|   +-- gql // GraphQL Structure Sample
|   +-- * // Other Nest Modules, non-global, same as common structure above
+-- test // Jest testing
+-- typings // Modules or global type definitions
```

## Implements

- See [app](src/app.ts), [app.module](src/app.module.ts)
  - Database
  - Module Router
  - Static Files
  - Validation
- [Global Exception Filter](src/common/filters/exceptions.filter.ts)
- [Global Logging Middleware](src/common/middleware/logger.middleware.ts)
- [Custom Logger for Production](src/common/providers/logger.service.ts)
- [配置](src/config)
- [Authentication](src/auth) - JWT and Session login with Passport
- [Role-based Guard](src/common/guards/roles.guard.ts)
- Controller Routes
  - [Auth Login](src/base/controllers/auth.controller.ts)
  - [Sample](src/sample/controllers/sample.controller.ts) Parameter, [DTO](src/sample/dto/sample.dto.ts)
  - [CRUD API Sample](src/sample/controllers/crud.controller.ts)
- [Database Query](src/sample/providers/database.service.ts) Example
- [Unit Test](src/sample/providers/crud.service.spec.ts)
- [E2E Test](test/e2e)
- [Shared Modules Example](src/shared)
- [GraphQL Structure Example](src/gql)
- [AWS SDK Example](src/aws)

## Documentation

```sh
# APP, Compodoc
npm run doc #> http://localhost:8080
# API, Swagger - src/swagger.ts
npm run doc:api #> http://localhost:8000/api
```

### File Naming for Class

```ts
export class PascalCaseSuffix {} //= pascal-case.suffix.ts
// Except for suffix, PascalCase to hyphen-case
class FooBarNaming {} //= foo-bar.naming.ts
class FooController {} //= foo.controller.ts
class BarQueryDto {} //= bar-query.dto.ts
```

### Interface Naming

```ts
// https://stackoverflow.com/questions/541912
// https://stackoverflow.com/questions/2814805
interface User {}
interface CustomeUser extends User {}
interface ThirdCustomeUser extends CustomeUser {}
```

### Index Exporting

```diff
# It is recommended to place index.ts in each folder and export.
# Unless it's a special case, it is import from a folder instead of directly from a file.
- import { FooController } from './controllers/foo.controller';
- import { BarController } from './controllers/bar.controller';
+ import { FooController, BarController } from './controllers';
```

### Variables Naming

> Refer to [Naming cheatsheet](https://github.com/kettanaito/naming-cheatsheet)

### Links

- [Nest Prisma Starter](https://github.com/CatsMiaow/nestjs-prisma-starter)
- [Nest TypeORM Starter](https://github.com/CatsMiaow/nestjs-typeorm-starter)
- [Nest Sample](https://github.com/nestjs/nest/tree/master/sample)
- [Awesome Nest](https://github.com/juliandavidmr/awesome-nestjs)
- [NestJS](https://docs.nestjs.com)
- [TypeORM](https://typeorm.io)
