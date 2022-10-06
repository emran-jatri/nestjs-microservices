import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices/client';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		@Inject("MAIN_SERVICE") private readonly mainClient: ClientProxy,
	) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
	}
	
	@Get('/user-create')
	userCreate() {
		this.mainClient.emit('user_create', "User created successfully!");
		console.log("------------ userCreate ---------")
		return "User created successfully!"
	}

}
