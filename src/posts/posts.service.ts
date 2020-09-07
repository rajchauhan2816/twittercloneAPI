import { Follower } from './../social/follower.schema';
import { PostModel } from './models/post.model';
import { Comment } from './schemas/comment.schema';
import { Like } from './schemas/like.schema';
import { User } from './../users/user.schema';
import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';
import { exception } from 'console';
import { _toObjectId, _toObjectIds } from 'src/helpers/objectid.helper';

@Injectable()
export class PostsService {
	constructor(
		@InjectModel('user') private userModel: Model<User>,
		@InjectModel('post') private postModel: Model<Post>,
		@InjectModel('comment') private commentModel: Model<Comment>,
		@InjectModel('like') private likeModel: Model<Like>,
		@InjectModel('follower') private followModel: Model<Follower>
	) {}

	async addPost(body: string, username: string) {
		const user = await this.userModel.findOne({ username });
		const post = await this.postModel.create({
			body,
			user: user._id
		});
		user.postCount++;
		user.save();
		return post;
	}

	async findAll(username: string) {
		const user = await this.userModel.findOne({ username });
		const result: PostModel[] = [];
		const posts = await this.postModel.find();
		for (const post of posts) {
			const like = await this.likeModel.find({
				content: post._id,
				type: 'post'
			});

			let isLiked = false;

			const mylike = await this.likeModel.findOne({ content: post._id, user: user._id });
			if (mylike) {
				isLiked = true;
			}

			const comment = await this.commentModel.find({
				content: post._id,
				type: 'post'
			});
			result.push({
				myLike: mylike ? mylike.toObject() : null,
				isLiked,
				post,
				like,
				comment
			});
		}
		return result;
	}

	async findHomePost(username: string) {
		const userIds: string[] = [];
		const user = await this.userModel.findOne({ username });
		const following = await this.followModel.find({ fromUser: user._id });
		if (following.length != 0) {
			for (const val of following) {
				userIds.push(val._id);
			}
		}
		userIds.push(user._id);
		const result: PostModel[] = [];
		const posts = await this.postModel.find().where('user').in(_toObjectIds(userIds));
		for (const post of posts) {
			const like = await this.likeModel.find({
				content: post._id,
				type: 'post'
			});

			let isLiked = false;

			const mylike = await this.likeModel.findOne({ content: post._id, user: user._id });
			if (mylike) {
				isLiked = true;
			}

			const comment = await this.commentModel.find({
				content: post._id,
				type: 'post'
			});
			result.push({
				myLike: mylike ? mylike.toObject() : null,
				isLiked,
				post,
				like,
				comment
			});
		}
		return result;
	}

	async findmyPost(username: string, otherUsername: string) {
		try {
			const user = await this.userModel.findOne({ username });

			const otherUser = await this.userModel.findOne({ username: otherUsername });

			const result: PostModel[] = [];
			const posts = await this.postModel.find({
				user: otherUser._id
			});
			for (const post of posts) {
				const like = await this.likeModel.find({
					content: post._id,
					type: 'post'
				});

				let isLiked = false;

				const mylike = await this.likeModel.findOne({ content: post._id, user: user._id });
				if (mylike) {
					isLiked = true;
				}

				const comment = await this.commentModel.find({
					content: post._id,
					type: 'post'
				});
				result.push({
					myLike: mylike ? mylike.toObject() : null,
					isLiked,
					post,
					like,
					comment
				});
			}
			return result;
		} catch (error) {}
	}

	async findOne(postId: string) {
		const post = await this.postModel.findById(postId);
		if (!post) throw new NotFoundException();
		return post;
	}

	async deletePost(postId: string) {
		const post = await this.postModel.findByIdAndDelete(postId);
		if (!post) throw new NotFoundException();
		return post;
	}
}
