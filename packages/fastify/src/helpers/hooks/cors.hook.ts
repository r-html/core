import { Reader } from '@rhtml/di';
import { FastifyInstance } from 'fastify';

export interface AllowedType {
  name: string;
  methods: string[];
}

export interface CorsOptions {
  allowedOrigins: AllowedType[];
}

export function corsHook(
  { allowedOrigins = [] }: CorsOptions = { allowedOrigins: [] }
): Reader<FastifyInstance, FastifyInstance> {
  return (instance) => {
    instance.addHook('preHandler', (req, res, done) => {
      const hostname = allowedOrigins.find((v) => v.name === req.hostname);
      if (hostname) {
        res.header('Access-Control-Allow-Origin', hostname.name);
        res.header('Access-Control-Allow-Headers', hostname.name);
        res.header('Access-Control-Allow-Methods', hostname.methods);
      }
      const isPreflight = /options/i.test(req.method);
      if (isPreflight) {
        return res.send();
      }
      return done();
    });
    return instance;
  };
}
