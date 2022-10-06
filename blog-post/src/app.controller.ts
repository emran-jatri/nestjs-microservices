import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		@Inject('POST_SERVICE') private readonly client: ClientProxy,
		@Inject('COMMENT_SERVICE') private readonly commentClient: ClientProxy
	) { }

  @Get()
	getHello(): string {
		this.client.emit('post', "Hello from post")
		this.commentClient.emit('post', "Hello from post")
    return this.appService.getHello();
  }
}
