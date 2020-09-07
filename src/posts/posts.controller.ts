import { LikeDTO } from './dtos/like.dto';
import { ICurrentUser } from './../auth/currentuser';
import { PostsService } from './posts.service';
import { CreatePostDTO, GetPostDTO } from './dtos/post.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { use } from 'passport';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
	constructor(private postService: PostsService) {}

	@Post()
	add(@Body() postDto: CreatePostDTO, @Request() { user }: ICurrentUser) {
		return this.postService.addPost(postDto.body, user.username);
	}

	@Get(':params')
	async findAll(@Param('params') params: any, @Request() { user }: ICurrentUser) {
		const paramsJson = JSON.parse(params);

		const username = paramsJson.username;

		if (paramsJson.type == 'explore') {
			return this.postService.findAll(user.username);
		}
		if (paramsJson.type == 'home') {
			return this.postService.findHomePost(user.username);
		}
		if (paramsJson.type == 'profile') {
			return await this.postService.findmyPost(user.username, username);
		}
	}

	@Delete(':id')
	delete(@Param() { id }) {
		return this.postService.deletePost(id);
	}

	// @Get(':id')
	// findOne(@Param() { id }) {
	// 	return this.postService.findOne(id);
	// }
}
