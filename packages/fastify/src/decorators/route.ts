import { get } from '@rhtml/di';
import { RouteOptions } from 'fastify';

import { Fastify } from '../fastify.tokens';
import { ControllerMetadata } from './controller.decorator';

export const Route =
  <T>(options: Partial<RouteOptions>) =>
  (target: T, memberName: string) => {
    const OnInit =
      target['OnInit'] ||
      function () {
        /*  */
      };
    Object.defineProperty(target, 'OnInit', {
      value: function (...args: unknown[]) {
        const metadata = (this._metadata ?? {
          route: '',
        }) as ControllerMetadata;
        get(Fastify).route({
          ...(options as never as RouteOptions),
          url: [metadata.route, options.url].join(''),
          handler: (request, reply) =>
            target[memberName].call(this, request, reply),
        });
        return OnInit.apply(this, args);
      },
      configurable: true,
      writable: true,
    });
  };
