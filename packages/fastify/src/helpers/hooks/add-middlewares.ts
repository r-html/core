import { Middleware } from '../../fastify.tokens';

export function addMiddlewares(middlewares: Middleware[] = []): Middleware {
  return (instance) => {
    for (const middleware of middlewares) {
      instance = middleware(instance);
    }
    return instance;
  };
}
