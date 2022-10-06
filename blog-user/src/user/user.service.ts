import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		@Inject("MAIN_SERVICE") private readonly mainClient: ClientProxy,
	) { }
	

	async create(data) {
		const user = await this.userModel.create(data)
		this.mainClient.emit('user_create', user);
		return user
	}

}
