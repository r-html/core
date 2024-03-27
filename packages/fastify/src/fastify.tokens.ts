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

export const Fastify = new InjectionToken<FastifyInstance>();

export interface FastifyPlugin {
  module: FastifyPluginCallback;
  options?: FastifyRegisterOptions<unknown>;
}

export interface FastifyModuleOptions extends FastifyHttpOptions<never> {
  plugins: FastifyPlugin[];
  schemas: FastifySchema[];
  globalErrorHandler: (
    instance: FastifyInstance
  ) => (
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
  ) => FastifyReply;
}
