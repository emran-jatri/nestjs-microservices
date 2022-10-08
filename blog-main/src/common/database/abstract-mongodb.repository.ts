import { AbstractMongoDBDocument } from './abstract-mongodb.schema';
import { Connection, Model } from 'mongoose';


export abstract class MongoDBRepository<T extends AbstractMongoDBDocument>{
	
	constructor(
		private readonly model: Model<T>,
		private readonly connection: Connection,
	) { }

	findAll(...args){
		return this.model.find(...args)
	};

	findOne(...args){
		return this.model.findOne(...args)
	};

	create(...args){
		return new this.model(...args)
	};

	update(...args){
		return this.model.findOneAndUpdate(...args)
	};

	delete(...args){
		return this.model.findOneAndDelete(...args)
	};
	
	async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}