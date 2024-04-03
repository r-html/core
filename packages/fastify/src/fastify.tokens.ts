import { InjectionToken } from '@rhtml/di';
import {
  FastifyError,
  FastifyHttpOptions,
  FastifyInstance,
  FastifyListenOptions,
  FastifyPluginCallback,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
} from 'fastify';

export const Fastify = new InjectionToken<FastifyInstance>();
export const FastifyListen = new InjectionToken<string>();

export interface FastifyPlugin {
  module: FastifyPluginCallback;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: FastifyRegisterOptions<any>;
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
  server: FastifyListenOptions;
}
