import { FastifySchema } from 'fastify';

import { Middleware } from '../../fastify.tokens';

export function addSchema(schemas: FastifySchema[]): Middleware {
  return (instance) => {
    for (const schema of schemas) {
      instance.addSchema(schema);
    }
    return instance;
  };
}
