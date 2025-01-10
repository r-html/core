import { Module, ModuleWithProviders } from '@rhtml/di';
import amqpClient, { Connection } from 'amqplib';

import { AmqpChannel, AmqpConnection, ModuleConfig } from './amqp.constants';
import { AmqpService } from './amqp.service';

@Module({
  providers: [AmqpService],
})
export class AmqpModule {
  public static forRoot(config: ModuleConfig): ModuleWithProviders {
    return {
      module: AmqpModule,
      providers: [
        {
          provide: AmqpConnection,
          useFactory: () => amqpClient.connect(config),
        },
        {
          provide: AmqpChannel,
          deps: [AmqpConnection],
          useFactory: async (connection: Connection) => {
            const channel = await connection.createChannel();
            if (config.prefetchCount) {
              await channel.prefetch(config.prefetchCount);
            }
            return channel;
          },
        },
      ],
    };
  }
}
