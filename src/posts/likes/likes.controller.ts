import { LikesService } from './likes.service';
import { LikeDTO } from '../dtos/like.dto';
import { ICurrentUser } from '../../auth/currentuser';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, UseGuards, Request, Delete, Param } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('posts/likes')
export class LikesController {
	constructor(private likeService: LikesService) {}

	@Post('')
	like(@Body() likeDto: LikeDTO, @Request() { user }: ICurrentUser) {
		if (likeDto.type === 'post') {
			return this.likeService.likePost(likeDto.contentId, user.username);
		}
	}

	@Delete('/:id')
	unlike(@Param() { id }) {
        return this.likeService.unlike(id);
    }
}
