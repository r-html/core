import { Reader } from '@rhtml/di';
import { FastifyInstance } from 'fastify';

import { GlobalErrorHandler } from '../../fastify.tokens';

export function globalErrorHandler(
  globalErrorHandler: GlobalErrorHandler
): Reader<FastifyInstance, FastifyInstance> {
  return (instance) => {
    if (globalErrorHandler) {
      instance.setErrorHandler(globalErrorHandler(instance));
    }
    return instance;
  };
}
