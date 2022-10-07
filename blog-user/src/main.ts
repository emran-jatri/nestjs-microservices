import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices/enums';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.connectMicroservice({
		transport: Transport.RMQ,
		options: {
			urls: ['amqps://jibzlvbd:QwX5CKtkkKdCtukf72eUxQSUO4vecBzE@dingo.rmq.cloudamqp.com/jibzlvbd'],
			queue: 'user_queue',
			queueOptions: {
				durable: false
			},
		},
	})

	await app.startAllMicroservices();
	await app.listen(3000);
	console.log(`Application is running on: ${await (await app.getUrl()).includes('[::1]') ? (await app.getUrl()).replace('[::1]', "localhost") : await app.getUrl()}`);
}
bootstrap();
