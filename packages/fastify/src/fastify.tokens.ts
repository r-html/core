import { InjectionToken } from '@rhtml/di';
import {
  FastifyHttpOptions,
  FastifyInstance,
  FastifyPluginCallback,
  FastifyRegisterOptions,
  FastifySchema,
} from 'fastify';

export const Fastify = new InjectionToken<FastifyInstance>();

export interface FastifyPlugin {
  module: FastifyPluginCallback;
  options?: FastifyRegisterOptions<unknown>;
}

export interface FastifyModuleOptions extends FastifyHttpOptions<never> {
  plugins: FastifyPlugin[];
  schemas: FastifySchema[];
}
