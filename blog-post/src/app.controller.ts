import { Controller, Get, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ClientProxy } from '@nestjs/microservices/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
	) { }

  @Get()
	getHello(): string {
    return this.appService.getHello();
	}

}
