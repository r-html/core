import { get, set } from '@rhtml/di';

import { SubscribeDecoratorOptions } from '../amqp.constants';
import { AmqpService } from '../amqp.service';

export const Subscribe =
  <T>({
    queue,
    consumeOptions = {},
    assertOptions = {},
    channel,
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
          async (msg, channel) => {
            try {
              await target[memberName].call(this, msg, channel);
            } catch (e) {
              console.error(
                `[AMQP][Subscribe]: queue "${queue}" failed to handle internally inside subscription "${memberName}" method`
              );
            }
          },
          {
            assertOptions,
            consumeOptions,
            channel: channel ? get(channel) : null,
          }
        );
        return OnInit.apply(this, args);
      },
      configurable: true,
      writable: true,
    });
  };
