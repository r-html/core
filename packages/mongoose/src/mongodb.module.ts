import { Module, ModuleWithProviders } from '@rhtml/di';
import mongoose, { ConnectOptions } from 'mongoose';

import { MONGOOSE_CONNECTION_TOKEN } from './mongodb.injection.tokens';

@Module()
export class MongoDbModule {
  public static forRoot(
    mongooseInstance: typeof mongoose,
    url: string,
    options?: ConnectOptions
  ): ModuleWithProviders {
    if (!url) {
      throw new Error('Missing MongoDB Url inside MongoDbModule.forRoot(...)');
    }
    return {
      module: MongoDbModule,
      providers: [
        {
          provide: MONGOOSE_CONNECTION_TOKEN,
          useFactory: async () => {
            try {
              return await mongooseInstance.connect(url, options);
            } catch (e) {
              console.error('Unable to initialize mongodb connection');
              console.error(e);
              throw new Error(e);
            }
          },
        },
      ],
    };
  }
}
