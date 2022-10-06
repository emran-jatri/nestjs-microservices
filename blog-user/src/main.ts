import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
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
	
	// const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
	// 	transport: Transport.RMQ,
	// 	options: {
	// 		urls: ['amqps://jibzlvbd:QwX5CKtkkKdCtukf72eUxQSUO4vecBzE@dingo.rmq.cloudamqp.com/jibzlvbd'],
	// 		queue: 'user_queue',
	// 		queueOptions: {
	// 			durable: false
	// 		},
	// 	},
	// });

	await app.startAllMicroservices();
	await app.listen(3000);
}
bootstrap();
