# @rhtml/amqp

`@rhtml/amqp` is an AMQP (Advanced Message Queuing Protocol) integration library designed for seamless interaction with message brokers such as RabbitMQ. It allows developers to easily publish and subscribe to messages, integrating AMQP functionalities into their applications with minimal setup.

---

## Features

- **AMQP Protocol Support**: Full support for AMQP protocol with customizable configurations.
- **Integration with Fastify**: Easily integrate AMQP with Fastify controllers and routes.
- **Simple Publish and Subscribe Mechanism**: Simplified API for sending and consuming messages.
- **Customizable Options**: Configure protocol, hostname, port, authentication, and vhost.

---

## Installation

To use `@rhtml/amqp` in your project, install it via npm:

```bash
npm i @rhtml/amqp
```

## Setup and Configuration

You can set up the AMQP connection in your application by using the AmqpModule.forRoot method. This allows you to configure the connection settings such as protocol, hostname, port, credentials, and vhost.

### Basic Configuration

```ts
import { FastifyModule } from '@rhtml/fastify';
import { AmqpModule } from '@rhtml/amqp';

@Module({
  imports: [
    FastifyModule.forRoot({...}),
    AmqpModule.forRoot({
      protocol: 'amqp', // Default protocol: 'amqp'
      hostname: 'localhost', // Hostname of the RabbitMQ server
      port: 5672, // Default AMQP port: 5672
      username: 'amqp user', // AMQP username (default: 'guest')
      password: 'amqp password', // AMQP password (default: 'guest')
      vhost: '', // Virtual host to use (default: empty string)
      /**
       * Optional
       * Set the prefetch count for this channel.
       * The count given is the maximum number of messages sent over the channel that can be awaiting acknowledgement;
       * once there are count messages outstanding,
       * the server will not send more messages on this channel until one or more have been acknowledged.
       */
      prefetchCount: 1
    }),
  ],
})
export class AppModule {}
```

### Configuration Options

- Protocol: Communication protocol. Default is amqp.
- Hostname: RabbitMQ server address. Default is localhost.
- Port: Port for RabbitMQ. Default is 5672.
- Username & Password: Authentication credentials. Defaults are guest and guest.
- vhost: RabbitMQ virtual host. Defaults to an empty string.

## Usage Example

### Controller Example

Integrate AMQP with your Fastify controllers for message subscription and publishing:

```ts
import { Controller, Route } from '@rhtml/fastify';
import { FastifyRequest } from 'fastify';
import {
  AmqpChannel,
  AmqpService,
  ConsumeMessage,
  Subscribe,
} from '@rhtml/amqp';

@Controller({
  route: '/',
})
export class MyController {
  constructor(private amqpService: AmqpService) {}

  // Subscription handler for consuming messages
  @Subscribe({
    name: 'test-queue',
    consumeOptions: {
      noAck: true, // Automatically acknowledge messages
    },
  })
  withAutoAcknowledge(data: ConsumeMessage, channel: AmqpChannel) {
    // Parse the incoming message
    const message = JSON.parse(data?.content.toString());
    console.log(message);
    // Output: { test: '123' }
  }

  @Subscribe({
    name: 'test-queue',
    consumeOptions: {
      noAck: false,
    },
  })
  withCustomAcknowledge(data: ConsumeMessage, channel: AmqpChannel) {
    const message = JSON.parse(data?.content.toString());

    setTimeout(() => {
      // Long Running Job can be parsing some file
      console.log(message);
      channel.ack(data!);
    }, 10000);
  }

  // Route to trigger message publication
  @Route({
    url: '',
    method: 'GET',
  })
  async myRouteTrigger(req: FastifyRequest) {
    // Publish a message to the 'test-queue'
    this.amqpService.publish('test-queue', { test: '123' });
  }
}
```

## Closing the AMQP connection after server stops

```ts
import { AmqpConnection } from '@rhtml/amqp'
import { InjectionToken, Module } from '@rhtml/di'
import { Fastify } from '@rhtml/fastify'

import { Connection } from 'amqplib'
import { FastifyInstance } from 'fastify'

@Module({
  providers: [
    /* Close the AMQP Connection when server stops */
    {
      provide: new InjectionToken(),
      deps: [Fastify, AmqpConnection],
      useFactory: (fastify: FastifyInstance, connection: Connection) =>
        fastify.addHook('onClose', () => connection.close()),
    },
  ]
})

```

## Define different channels and attach them to subscriptions

```typescript
import { Channel, AmqpConnection, Connection } from '@rhtml/amqp';
import { InjectionToken } from '@rhtml/di';

/**
 * Injection for MyAmqpChannel
 */
export const MyAmqpChannel = new InjectionToken<Channel>();

@Module({
  providers: [
    {
      provide: MyAmqpChannel,
      deps: [AmqpConnection],
      useFactory: async (connection: Connection) => {
        const channel = await connection.createChannel();
        await channel.prefetch(1);
        return channel;
      },
    },
  ],
  bootstrap: [WeatherDataController],
})
export class AppModule {}

@Controller({
  route: '/',
})
export class WeatherDataController {
  constructor(
    private weatherDataService: WeatherDataService,
    private amqpService: AmqpService
  ) {}

  @Subscribe({
    queue: 'my-queue-with-acknowledgment',
    consumeOptions: {
      noAck: false,
    },
    channel: MyAmqpChannel,
  })
  async preParseRequest(message: ConsumeMessage, channel: AmqpChannel) {
    // You need to manually acknowledge the message or it is threated as `unacked` in RabbitMQ Dashboard
    channel.ack(message);
  }

  @Subscribe({
    queue: 'my-queue-without-acknowledgment',
    channel: MyAmqpChannel,
  })
  async preParseRequest(message: ConsumeMessage, channel: AmqpChannel) {
    // Do something here and message will be auto acknowledged
  }
}
```

## Key Concepts

1. Message Subscription
   The @Subscribe decorator listens for messages on a specified queue:

- Queue Name: Specifies the queue to consume messages from.
- Consume Options: Allows you to define acknowledgment behavior (e.g., noAck for auto-acknowledge).

2. Message Publishing
   The publish method provided by AmqpService sends messages to a specified queue:

- Queue Name: Specifies the destination queue.
- Message Payload: Contains the data object to be sent.

3. Message Acknowledgment
   For more control over message processing, use the ack callback to manually acknowledge messages when noAck is set to false.

## Example Workflow

1. Subscription: The controller subscribes to the test-queue using the @Subscribe decorator. Any message sent to this queue is automatically consumed by the mySubscription method.

2. Route Trigger: The myRouteTrigger route is exposed as a GET endpoint. When accessed, it publishes a message ({ test: '123' }) to the test-queue.

3. Message Consumption: The subscription method processes the published message, logs its content, and acknowledges it if required.

## Advanced Configuration

Extend the configuration to include custom retry policies, connection recovery, or specific consume behaviors tailored to your application.

## License

This library is licensed under the MIT License. Feel free to use, modify, and distribute it for your projects.
