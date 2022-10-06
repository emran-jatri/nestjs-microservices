import { Controller, Get, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices/decorators';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices/client';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		@Inject("USER_SERVICE") private readonly userClient: ClientProxy,
		@Inject("POST_SERVICE") private readonly postClient: ClientProxy,
		@Inject("COMMENT_SERVICE") private readonly commentClient: ClientProxy,
	) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


	@EventPattern("user_create")
	userCreate(data: string) {
		this.postClient.emit("user_create", data);
		this.commentClient.emit("user_create", data);
		console.log('main service :',data)
	}

	@EventPattern("post_create")
	postCreate(data: string) {
		this.commentClient.emit("post_create", data);
		console.log('main service :', data)
	}

}
