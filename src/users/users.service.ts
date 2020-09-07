import { User } from './user.schema';
import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
@Injectable()
export class UsersService {
	constructor(@InjectModel('user') private userModel: Model<User>) {}

	async findOne(username: string): Promise<User | undefined> {
		const user = await this.userModel.findOne({ username });
		if (!user) throw new NotFoundException();
		return user;
	}

	async add(username: string, password: string, name: string, age: number) {
		let user = await this.userModel.findOne({ username });
		if (user) throw new HttpException('Username Already Exist', 409);

		user = await this.userModel.create({ username, password: await hash(password, 10), name, age });
		return user;
	}

	async delete(username: string) {
		const user = await this.userModel.findOneAndDelete({ username });

		if (!user) throw new NotFoundException();
		return user;
	}

	async setProfilePicture(username: string, profilePicture: string) {
		const user = await this.userModel.findOne({ username });

		if (!user) throw new NotFoundException();

		user.profilePicture = profilePicture;
		return user.save();
	}
}
