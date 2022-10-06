import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }
	
	@Post('/create')
	create(@Body() data: any) {
		console.log("user-create: ",data)
		return this.userService.create(data);
	}
}
