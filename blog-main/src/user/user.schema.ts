import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AbstractMongoDBDocument } from './../common/database/abstract-mongodb.schema';

// export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends AbstractMongoDBDocument{
  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);