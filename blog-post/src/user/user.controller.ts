import { Controller, Post, Body } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }
	
	@EventPattern('user_create')
	async create(@Body() data: any) {
		const user = await this.userService.create(data);
		console.log("post => user-create: ", user)
	}
}
