import { Inject, Injectable } from '@rhtml/di';
import { Channel, ConsumeMessage, Options } from 'amqplib';

import { AmqpChannel } from './amqp.constants';

@Injectable()
export class AmqpService {
  constructor(@Inject(AmqpChannel) private channel: AmqpChannel) {}

  async publish<T = Record<string, string>>(
    name: string,
    payload: T,
    options?: Options.AssertQueue
  ) {
    await this.channel.assertQueue(name, options);
    return this.channel.sendToQueue(name, Buffer.from(JSON.stringify(payload)));
  }

  async subscribe(
    name: string,
    callback: (msg: ConsumeMessage, channel: Channel) => void,
    options?: {
      assertOptions?: Options.AssertQueue;
      consumeOptions?: Options.Consume;
    }
  ) {
    await this.channel.assertQueue(name, options?.assertOptions);

    await this.channel.consume(
      name,
      (data) => callback(data!, this.channel),
      options?.consumeOptions
    );
  }
}
