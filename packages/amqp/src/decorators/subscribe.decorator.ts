import { set } from '@rhtml/di';
import { ConsumeMessage, Options } from 'amqplib';

import { AmqpService } from '../amqp.service';

export const Subscribe =
  <T>({
    name,
    consumeOptions = {},
    assertOptions = {},
  }: {
    name: string;
    consumeOptions?: Options.Consume;
    assertOptions?: Options.AssertQueue;
    parser?: <T = never>(msg: ConsumeMessage | null) => T;
  }) =>
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
          name,
          (msg, ack) => target[memberName].call(this, msg, ack),
          { assertOptions, consumeOptions }
        );
        return OnInit.apply(this, args);
      },
      configurable: true,
      writable: true,
    });
  };
