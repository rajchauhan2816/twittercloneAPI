import { ICurrentUser } from './../auth/currentuser';
import { SocialService } from './social.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Post, Param, UseGuards, Request, Delete, Get } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('social')
export class SocialController {
	constructor(private socialService: SocialService) {}

	@Post('follow/:touser')
	follow(@Param() { touser }, @Request() { user }: ICurrentUser) {
		return this.socialService.followUser(touser, user.username);
	}

	@Delete('follow/:touser')
	unfollow(@Param() { touser }, @Request() { user }: ICurrentUser) {
		return this.socialService.UnfollowUser(touser, user.username);
	}

	@Get('followers')
	followers(@Request() { user }: ICurrentUser) {
		return this.socialService.findFollowers(user.username);
	}

	@Get('following')
	following(@Request() { user }: ICurrentUser) {
		return this.socialService.findFollowing(user.username);
	}

	@Get('isfollow/:username')
	isfollow(@Request() { user }: ICurrentUser, @Param() { username }) {
		return this.socialService.isfollow(user.username, username);
	}
}
