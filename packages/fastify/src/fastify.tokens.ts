import { InjectionToken } from '@rhtml/di';
import {
  FastifyError,
  FastifyHttpOptions,
  FastifyInstance,
  FastifyPluginCallback,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
} from 'fastify';

import { CorsOptions } from './helpers/hooks/cors.hook';

export const Fastify = new InjectionToken<FastifyInstance>();

export interface FastifyPlugin {
  module: FastifyPluginCallback;
  options?: FastifyRegisterOptions<unknown>;
}

export type GlobalErrorHandler = (
  instance: FastifyInstance
) => (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => FastifyReply;

export interface FastifyModuleOptions extends FastifyHttpOptions<never> {
  plugins: FastifyPlugin[];
  schemas: FastifySchema[];
  globalErrorHandler: GlobalErrorHandler;
  cors: CorsOptions;
}
