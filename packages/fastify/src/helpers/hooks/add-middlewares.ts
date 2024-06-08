import { Reader } from '@rhtml/di';
import { FastifyInstance } from 'fastify';

export type Middleware = (instance: FastifyInstance) => FastifyInstance;

export function addMiddlewares(
  middlewares: Middleware[] = []
): Reader<FastifyInstance, FastifyInstance> {
  return (instance) => {
    for (const middleware of middlewares) {
      instance = middleware(instance);
    }
    return instance;
  };
}
