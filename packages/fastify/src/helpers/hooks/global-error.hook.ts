import { GlobalErrorHandler, Middleware } from '../../fastify.tokens';

export function globalErrorHandler(
  globalErrorHandler: GlobalErrorHandler
): Middleware {
  return (instance) => {
    if (globalErrorHandler) {
      instance.setErrorHandler(globalErrorHandler(instance));
    }
    return instance;
  };
}
