import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		@Inject("USER_SERVICE") private readonly userClient: ClientProxy,
		@Inject("POST_SERVICE") private readonly postClient: ClientProxy,
		@Inject("COMMENT_SERVICE") private readonly commentClient: ClientProxy,
	) { }
	
	@EventPattern('user_create')
	async create(data: any) {
		this.postClient.emit('user_create', data);
		this.commentClient.emit('user_create', data);

		const user = await this.userService.create(data);
		console.log("main => user-create: ", user)
	}
}
