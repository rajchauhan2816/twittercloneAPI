import { Document, Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
})
export class Like extends Document {
	@Prop() id: Types.ObjectId;

    @Prop({required: true}) content: Types.ObjectId;

    @Prop({required: true}) type:string;
    

	@Prop({ required: true, ref: 'user', autopopulate: true })
	user: Types.ObjectId;
}

export const likeSchema = SchemaFactory.createForClass(Like);
