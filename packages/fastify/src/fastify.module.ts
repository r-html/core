import { Module, ModuleWithProviders } from '@rhtml/di';
import fastify, { FastifyInstance } from 'fastify';

import { Fastify, FastifyListen, FastifyModuleOptions } from './fastify.tokens';
import { addMiddlewares, addSchema, globalErrorHandler, pipe } from './helpers';

@Module()
export class FastifyModule {
  public static forRoot(
    fastifyInstance: typeof fastify,
    options: Partial<FastifyModuleOptions>
  ): ModuleWithProviders<FastifyModule> {
    return {
      module: FastifyModule,
      providers: [
        {
          provide: Fastify,
          useFactory: async (): Promise<FastifyInstance> => {
            const instance = await fastifyInstance(options);
            const plugins = options.plugins || [];
            const schemas = options.schemas || [];

            for (const plugin of plugins) {
              await instance.register(plugin.module, plugin.options);
            }

            return pipe(
              addSchema(schemas),
              globalErrorHandler(options.globalErrorHandler),
              addMiddlewares(options.middlewares || [])
            )(instance);
          },
        },

        {
          provide: FastifyListen,
          deps: [Fastify],
          provideAtEnd: true,
          useFactory: (instance: FastifyInstance) =>
            instance.listen(options.server),
        },
      ],
    };
  }
}
