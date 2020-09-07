import { userSchema } from './../users/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './../users/users.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from './../users/users.module';
import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule,
		UsersModule,
		PassportModule,
		JwtModule.registerAsync({
			useFactory: (config: ConfigService) => ({
				secret: config.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: '1h' }
			}),
			imports: [ ConfigModule ],
			inject: [ ConfigService ]
		}),
		MongooseModule.forFeature([ { name: 'user', schema: userSchema } ])
	],
	controllers: [ AuthController ],
	providers: [ AuthService, UsersService, LocalStrategy, JwtStrategy ],
	exports: [ AuthService ]
})
export class AuthModule {}
