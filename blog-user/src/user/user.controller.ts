import { Controller, Post, Body, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		@Inject("MAIN_SERVICE") private readonly mainClient: ClientProxy,
	) { }
	
	@Post('/create')
	async create(@Body() data: any) {
		const user = await this.userService.create(data);

		console.log("user => user-create: ", user)
		
		this.mainClient.emit('user_create', user);

		return user
	}
	
	@Post('/update')
	async update(@Body() data: any) {
		const user = await this.userService.update(data);

		console.log("user => user-update: ", user)
		
		this.mainClient.emit('user_update', user);

		return user
	}
}
