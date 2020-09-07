import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { SocialModule } from './social/social.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ ConfigModule ],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('DB_URL'),
				connectionFactory: (connection) => {
					connection.plugin(require('mongoose-autopopulate'));
					return connection;
				}
			}),
			inject: [ ConfigService ]
		}),
		UsersModule,
		AuthModule,
		PostsModule,
		SocialModule
	]
})
export class AppModule {}
