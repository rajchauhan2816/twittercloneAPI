import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
	timestamps: true
})
export class Follower extends Document {
	@Prop({ required: true, ref: 'user', autopopulate: true })
	fromUser: Types.ObjectId;

	@Prop({ required: true, ref: 'user', autopopulate: true })
	toUser: Types.ObjectId;
}

export const followerSchema = SchemaFactory.createForClass(Follower);
