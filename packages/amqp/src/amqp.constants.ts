import { InjectionToken } from '@rhtml/di';
import { Channel, Connection } from 'amqplib';

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

export type AckCallbackFunction = () => void;
