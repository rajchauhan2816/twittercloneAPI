import { followerSchema } from './../social/follower.schema';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { LikesService } from './likes/likes.service';
import { LikesController } from './likes/likes.controller';
import { commentSchema } from './schemas/comment.schema';
import { likeSchema } from './schemas/like.schema';
import { postSchema } from './schemas/post.schema';
import { userSchema } from './../users/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
	imports: [
		MongooseModule.forFeature([ { name: 'user', schema: userSchema } ]),
		MongooseModule.forFeature([ { name: 'post', schema: postSchema } ]),
		MongooseModule.forFeature([ { name: 'like', schema: likeSchema } ]),
		MongooseModule.forFeature([ { name: 'comment', schema: commentSchema } ]),
		MongooseModule.forFeature([ { name: 'follower', schema: followerSchema } ]),
	],
	controllers: [ PostsController, LikesController, CommentsController ],
	providers: [ PostsService, LikesService, CommentsService ]
})
export class PostsModule {}
