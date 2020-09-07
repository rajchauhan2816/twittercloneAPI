import { userSchema } from './../users/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { followerSchema } from './follower.schema';
import { Module } from '@nestjs/common';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';

@Module({
	imports: [
		MongooseModule.forFeature([ { name: 'follower', schema: followerSchema } ]),
		MongooseModule.forFeature([ { name: 'user', schema: userSchema } ])
	],
	controllers: [ SocialController ],
	providers: [ SocialService ]
})
export class SocialModule {}
