import { Reader } from '@rhtml/di';
import { FastifyInstance, FastifySchema } from 'fastify';

export function addSchema(
  schemas: FastifySchema[]
): Reader<FastifyInstance, FastifyInstance> {
  return (instance) => {
    for (const schema of schemas) {
      instance.addSchema(schema);
    }
    return instance;
  };
}
