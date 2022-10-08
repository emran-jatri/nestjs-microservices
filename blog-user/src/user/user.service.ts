import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) { }
	

	create(data) {
		return new this.userModel(data).save()
	}

	update(data) {
		const {_id, user} = data
		return this.userModel.findOneAndUpdate({_id}, {$set: user}, {new: true, runValidators: true})
	}

}
