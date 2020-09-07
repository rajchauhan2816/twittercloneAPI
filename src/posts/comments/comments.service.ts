import { Comment } from './../schemas/comment.schema';
import { PostsService } from '../posts.service';
import { User } from '../../users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { _toObjectId } from 'src/helpers/objectid.helper';

@Injectable()
export class CommentsService {
	constructor(
		@InjectModel('comment') private commentModel: Model<Comment>,
		@InjectModel('user') private userModel: Model<User>,
		private postService: PostsService
	) {}

	async commentPost(postId: string, body: string, username: string) {
		const user = await this.userModel.findOne({ username });

		const post = await this.postService.findOne(postId);
		if (!post) throw new NotFoundException();

		const comment = await this.commentModel.create({ content: post._id, body, user: user._id, type: 'post' });
		return comment;
	}

	async replyComment(commentId: string, body: string, username: string) {
		const user = await this.userModel.findOne({ username });

		const superComment = await this.commentModel.findById(commentId);
		if (!superComment) throw new NotFoundException();

		const comment = await this.commentModel.create({
			content: superComment._id,
			body,
			user: user._id,
			type: 'comment'
		});
		return comment;
	}

	async deleteComment(commentId: string) {
		const comment = await this.commentModel.findByIdAndDelete(commentId);
		if (!comment) throw new NotFoundException();
		return comment;
	}

	async deleteReply(replyId: string) {
		const reply = await this.commentModel.findByIdAndDelete(replyId);
		if (!reply) throw new NotFoundException();
		return reply;
	}

	async findAllReplies(commentId: string) {
		const replies = this.commentModel.find({ content: _toObjectId(commentId), type: 'comment' });
		return replies;
	}

	async findAllComments(postId: string) {
		const replies = this.commentModel.find({ content: _toObjectId(postId), type: 'post' });
		return replies;
	}
}
