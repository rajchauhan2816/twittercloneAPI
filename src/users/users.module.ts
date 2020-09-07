import { userSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [ MongooseModule.forFeature([ { name: 'user', schema: userSchema } ]) ],
	controllers: [ UsersController ],
	providers: [ UsersService ],
})
export class UsersModule {}
