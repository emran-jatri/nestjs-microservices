import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(
		// @InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly userRepository: UserRepository
	) { }
	

	create(data) {
		return this.userRepository.create(data).save()
	}

}
