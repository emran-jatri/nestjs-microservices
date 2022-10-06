import { Controller, Get, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ClientProxy } from '@nestjs/microservices/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		@Inject('MAIN_SERVICE') private readonly mainClient: ClientProxy,
	) { }

  @Get()
	getHello(): string {
    return this.appService.getHello();
	}
	
	@Get('/post-create')
	postCreate() {
		this.mainClient.emit('post_create', "Post created successfully!");
		console.log("------------ postCreate ---------")
		return "Post created successfully!"
	}

	@EventPattern('user_create')
	userCreate(data: string): void {
		console.log("post service: ", data)
	}


}
