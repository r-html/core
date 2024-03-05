# @rhtml/fastify

#### Installation

```bash
npm i @rhtml/fastify
```

#### Usage

```ts
import multipart from '@fastify/multipart';
import { Module } from '@rhtml/di';

import { FastifyModule } from '@rhtml/fastify';

@Module({
  imports: [
    FastifyModule.forRoot({
      logger: pino({
        level: 'debug',
      }),
      plugins: [
        {
          module: multipart,
        },
      ],
    }),
  ],
})
export class AppModule {}
```

#### Controller

```typescript
import { Controller, Route } from '@core';

@Controller({
  route: '/status',
})
export class HealthCheckController {
  @Route({
    method: 'GET',
  })
  healthCheck() {
    return {
      server: {
        status: 'working',
      },
    };
  }
}
```

#### AppModule

```typescript
import 'pino-pretty';

import { Module } from '@rhtml/di';
import pino from 'pino';

import { FastifyModule } from '@rhtml/fastify';

import { HealthCheckController } from './healtcheck.controller';

@Module({
  imports: [
    FastifyModule.forRoot({
      logger: pino({
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      }),
    }),
  ],
  bootstrap: [HealthCheckController],
})
export class AppModule {}
```

#### Importing external plugin to fastify rhtml module

```typescript
import 'pino-pretty';

import multipart from '@fastify/multipart';
import { Module } from '@rhtml/di';
import pino from 'pino';

import { FastifyModule } from '@rhtml/fastify';

import { HealthCheckController } from './healtcheck.controller';

@Module({
  imports: [
    FastifyModule.forRoot({
      logger: pino({
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      }),
      plugins: [
        {
          module: multipart,
          options: {},
        },
      ],
    }),
  ],
  bootstrap: [HealthCheckController],
})
export class AppModule {}
```
