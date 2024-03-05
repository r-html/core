import { Module, ModuleWithProviders } from '@rhtml/di';
import fastify from 'fastify';

import { Fastify, FastifyModuleOptions } from './fastify.tokens';

@Module()
export class FastifyModule {
  public static forRoot(
    options: Partial<FastifyModuleOptions>
  ): ModuleWithProviders<FastifyModule> {
    return {
      module: FastifyModule,
      providers: [
        {
          provide: Fastify,
          useFactory: async () => {
            const instance = fastify(options);
            const plugins = options.plugins || [];
            const schemas = options.schemas || [];

            for (const plugin of plugins) {
              await instance.register(plugin.module, plugin.options);
            }
            for (const schema of schemas) {
              instance.addSchema(schema);
            }
            return instance;
          },
        },
      ],
    };
  }
}
