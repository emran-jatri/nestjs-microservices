import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	app.connectMicroservice({
		transport: Transport.RMQ,
		options: {
			urls: ['amqps://jibzlvbd:QwX5CKtkkKdCtukf72eUxQSUO4vecBzE@dingo.rmq.cloudamqp.com/jibzlvbd'],
			queue: 'comment_queue',
			queueOptions: {
				durable: false
			},
		},
	})

	await app.startAllMicroservices();
	await app.listen(3002);
}
bootstrap();
