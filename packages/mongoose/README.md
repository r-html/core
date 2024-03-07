# @rhtml/mongoose

#### Installation

```bash
npm i @rhtml/mongoose
```

#### Usage

```ts
import { Module } from '@rhtml/di';
import mongoose from 'mongoose';

import { MongoDbModule } from './mongodb';

@Module({
  imports: [MongoDbModule.forRoot(mongoose, 'MONGODB_CONNECTION_STRING')],
})
export class CoreModule {}
```
