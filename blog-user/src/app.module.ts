import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices/module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'MAIN_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: ['amqps://jibzlvbd:QwX5CKtkkKdCtukf72eUxQSUO4vecBzE@dingo.rmq.cloudamqp.com/jibzlvbd'],
					queue: 'main_queue',
					queueOptions: {
						durable: false
					},
				},
			},
		])
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
