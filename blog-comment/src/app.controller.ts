import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices/client';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		@Inject("MAIN_SERVICE") private readonly mainClient: ClientProxy
	) { }

  @Get()
	getHello(): string {
    return this.appService.getHello();
	}
	
	@EventPattern('user_create')
	userCreate(data: string): void {
		console.log("comment service: ", data)
	}

	@EventPattern('post_create')
	postCreate(data: string): void {
		console.log("comment service: ", data)
	}

}
