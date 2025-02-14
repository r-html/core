import { Inject, Injectable } from '@rhtml/di';
import { Channel, ConsumeMessage, Options } from 'amqplib';
import amqpClient, { Connection } from 'amqplib';

import { AmqpChannel, ModuleConfig } from './amqp.constants';

@Injectable()
export class AmqpService {
  constructor(@Inject(AmqpChannel) private channel: AmqpChannel) {}

  async publish<T = Record<string, string>>(
    name: string,
    payload: T,
    options?: {
      assertOptions?: Options.AssertQueue;
      channel?: AmqpChannel;
    }
  ) {
    const channel = options?.channel ?? this.channel;

    await channel.assertQueue(name, options?.assertOptions);
    return channel.sendToQueue(name, Buffer.from(JSON.stringify(payload)));
  }

  async subscribe(
    name: string,
    callback: (msg: ConsumeMessage, channel: Channel) => void,
    options?: {
      assertOptions?: Options.AssertQueue;
      consumeOptions?: Options.Consume;
      channel?: AmqpChannel;
    }
  ) {
    const channel = options.channel ?? this.channel;
    await channel.assertQueue(name, options?.assertOptions);

    await channel.consume(
      name,
      (data) => callback(data!, channel),
      options?.consumeOptions
    );
  }

  public static createConnection(config: ModuleConfig) {
    return amqpClient.connect(config);
  }

  public static async createChannel(
    connection: Connection,
    prefetchCount?: number
  ) {
    const channel = await connection.createChannel();
    if (prefetchCount) {
      await channel.prefetch(prefetchCount);
    }
    return channel;
  }
}
