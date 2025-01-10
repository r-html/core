import { set } from '@rhtml/di';

import { SubscribeDecoratorOptions } from '../amqp.constants';
import { AmqpService } from '../amqp.service';

export const Subscribe =
  <T>({
    queue,
    consumeOptions = {},
    assertOptions = {},
  }: SubscribeDecoratorOptions) =>
  (target: T, memberName: string) => {
    const OnInit =
      target['OnInit'] ||
      function () {
        /*  */
      };
    Object.defineProperty(target, 'OnInit', {
      value: async function (...args: unknown[]) {
        const amqpService = set(AmqpService);
        await amqpService.subscribe(
          queue,
          (msg, channel) => target[memberName].call(this, msg, channel),
          { assertOptions, consumeOptions }
        );
        return OnInit.apply(this, args);
      },
      configurable: true,
      writable: true,
    });
  };
