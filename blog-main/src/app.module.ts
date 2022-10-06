import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ClientsModule.register([
		{
			name: 'USER_SERVICE',
			transport: Transport.RMQ,
			options: {
				urls: ['amqps://jibzlvbd:QwX5CKtkkKdCtukf72eUxQSUO4vecBzE@dingo.rmq.cloudamqp.com/jibzlvbd'],
				queue: 'user_queue',
				queueOptions: {
					durable: false
				},
			},
		},
		{
			name: 'POST_SERVICE',
			transport: Transport.RMQ,
			options: {
				urls: ['amqps://jibzlvbd:QwX5CKtkkKdCtukf72eUxQSUO4vecBzE@dingo.rmq.cloudamqp.com/jibzlvbd'],
				queue: 'post_queue',
				queueOptions: {
					durable: false
				},
			},
		},
		{
			name: 'COMMENT_SERVICE',
			transport: Transport.RMQ,
			options: {
				urls: ['amqps://jibzlvbd:QwX5CKtkkKdCtukf72eUxQSUO4vecBzE@dingo.rmq.cloudamqp.com/jibzlvbd'],
				queue: 'comment_queue',
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
