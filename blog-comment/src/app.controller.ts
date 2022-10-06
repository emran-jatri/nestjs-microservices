import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices/client';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		@Inject("COMMENT_SERVICE") private readonly client: ClientProxy
	) { }

  @Get()
	getHello(): string {
		this.client.emit('comment-hello', "Hello World! from Comment!");
    return this.appService.getHello();
	}
	
	@MessagePattern('post')
	eventFromPost(data: string) {
		console.log(data);
	}

}
