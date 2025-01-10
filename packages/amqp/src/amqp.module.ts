import { Module, ModuleWithProviders } from '@rhtml/di';
import amqpClient, { Connection, Options } from 'amqplib';

import { AmqpChannel, AmqpConnection } from './amqp.constants';
import { AmqpService } from './amqp.service';

@Module({
  providers: [AmqpService],
})
export class AmqpModule {
  public static forRoot(config: Options.Connect): ModuleWithProviders {
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
          useFactory: (connection: Connection) => connection.createChannel(),
        },
      ],
    };
  }
}
