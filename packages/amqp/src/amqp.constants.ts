import { InjectionToken } from '@rhtml/di';
import { Channel, Connection, Options } from 'amqplib';

/**
 * Injection for AmqpConnection
 */
export const AmqpConnection = new InjectionToken<Connection>();
export type AmqpConnection = Connection;

/**
 * Injection for AmqpChannel
 */
export const AmqpChannel = new InjectionToken<Channel>();
export type AmqpChannel = Channel;

export interface ModuleConfig extends Options.Connect {
  /**
   * Set the prefetch count for this channel.
   * The count given is the maximum number of messages sent over the channel that can be awaiting acknowledgement;
   * once there are count messages outstanding,
   * the server will not send more messages on this channel until one or more have been acknowledged.
   */
  prefetchCount?: number;
}

export interface SubscribeDecoratorOptions {
  queue: string;
  consumeOptions?: Options.Consume;
  assertOptions?: Options.AssertQueue;
}

export { Connection } from 'amqplib';
