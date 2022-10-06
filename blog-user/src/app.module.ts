import { Global, Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices/module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Global()
@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost/blog-user'),
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
		]),
		UserModule,
	],
  controllers: [AppController],
	providers: [AppService],
	exports: [
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
		]),
	],
})
export class AppModule {}
