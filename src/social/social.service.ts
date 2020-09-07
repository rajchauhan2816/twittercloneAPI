import { User } from './../users/user.schema';
import { Follower } from './follower.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class SocialService {
	constructor(
		@InjectModel('follower') private followerModel: Model<Follower>,
		@InjectModel('user') private userModel: Model<User>
	) {}

	async followUser(toUsername: string, fromUsername: string) {
		const toUser = await this.userModel.findOne({ username: toUsername });
		const fromUser = await this.userModel.findOne({ username: fromUsername });

		if (!toUser || !fromUser) throw new NotFoundException();

		let follower = await this.followerModel.findOne({ fromUser: fromUser._id, toUser: toUser._id });
		if (follower) throw new HttpException('Already Followed', 409);

		follower = await this.followerModel.create({ fromUser: fromUser._id, toUser: toUser._id });
		toUser.followersCount++;
		fromUser.followingCount++;
		await Promise.all([ toUser.save(), fromUser.save() ]);
		return follower;
	}

	async UnfollowUser(toUsername: string, fromUsername: string) {
		const toUser = await this.userModel.findOne({ username: toUsername });
		const fromUser = await this.userModel.findOne({ username: fromUsername });

		if (!toUser || !fromUser) throw new NotFoundException();

		const follower = await this.followerModel.findOneAndDelete({ fromUser: fromUser._id, toUser: toUser._id });
		if (!follower) throw new HttpException('You are not a Follower', 400);
		//
		toUser.followersCount--;
		fromUser.followingCount--;
		Promise.all([ toUser.save(), fromUser.save() ]);

		return follower;
	}

	async findFollowers(username: string) {
		const user = await this.userModel.findOne({ username });
		const followers = await this.followerModel.find({ toUser: user._id });
		return followers;
	}

	async findFollowing(username: string) {
		const user = await this.userModel.findOne({ username });
		const following = await this.followerModel.find({ fromUser: user._id });
		return following;
	}

	async isfollow(fromUsername: string, toUsername: string){
		const toUser = await this.userModel.findOne({ username: toUsername });
		const fromUser = await this.userModel.findOne({ username: fromUsername });

		const follow = await this.followerModel.findOne({toUser:toUser._id, fromUser:fromUser._id});

		if(!follow){
			return false;
		}
		return true;
	}
}
