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
    return {
      module: MongoDbModule,
      providers: [
        {
          provide: MONGOOSE_CONNECTION_TOKEN,
          useFactory: () => mongooseInstance.connect(url, options),
        },
      ],
    };
  }
}
