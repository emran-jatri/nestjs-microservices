import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { MongoDBRepository } from "../common/database/abstract-mongodb.repository";
import { User } from "./user.schema";


@Injectable()
export class UserRepository extends MongoDBRepository<User>{
	constructor(
		@InjectModel(User.name) userModel: Model<User>,
		@InjectConnection() connection: Connection,
	) {
		super(userModel, connection);
	}
}