import { Post } from './../schemas/post.schema';
import { PostsService } from '../posts.service';
import { User } from '../../users/user.schema';
import { Like } from '../schemas/like.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class LikesService {
	constructor(
		@InjectModel('like') private likeModel: Model<Like>,
        @InjectModel('user') private userModel: Model<User>,
        @InjectModel('post') private postModel: Model<Post>,
		private postService: PostsService
	) {}

	async likePost(postId: string, username: string) {
		const user = await this.userModel.findOne({ username });

		const post = await this.postService.findOne(postId);
		if (!post) throw new NotFoundException();

		let like = await this.likeModel.findOne({ content: post._id, user: user._id, type: 'post' });
		if (like) throw new HttpException('Already Like', 409);

		like = await this.likeModel.create({ content: post._id, user: user._id, type: 'post' });

        const postUser = await this.userModel.findById( post.user );
        postUser.likesCount++;
        await postUser.save();
		return like;
	}

	async unlike(likeId: string) {
        const like = await this.likeModel.findByIdAndDelete(likeId);
        if (!like) throw new NotFoundException();
        //
        const post = await this.postModel.findById(like.content);
        const postUser = await this.userModel.findById( post.user );
        postUser.likesCount--;
        postUser.save();
		return like;
	}
}
