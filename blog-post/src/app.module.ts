import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Global } from '@nestjs/common/decorators';
@Global()
@Module({
	imports: [
	MongooseModule.forRoot('mongodb://localhost/blog-post'),
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
	UserModule
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
