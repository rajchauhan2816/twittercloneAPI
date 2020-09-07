import { Document, Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
	timestamps: true
})
export class Post extends Document {
	@Prop() id: Types.ObjectId;

	@Prop({ required: true })
	body: string;

	@Prop({ required: true, ref: 'user', autopopulate: true })
	user: Types.ObjectId;
}

export const postSchema = SchemaFactory.createForClass(Post);
