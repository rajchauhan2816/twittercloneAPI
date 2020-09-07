import { CommentDTO, ReplyDTO } from './../dtos/comment.dto';
import { ICurrentUser } from '../../auth/currentuser';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';

@UseGuards(JwtAuthGuard)
@Controller('posts/comments')
export class CommentsController {
	constructor(private commentsService: CommentsService) {}

	@Get(':id')
	getComments(@Param() { id }){
		return this.commentsService.findAllComments(id);
	}

	@Get('replies/:id')
	getReplies(@Param() { id }){
		return this.commentsService.findAllReplies(id);
	}

	@Post('')
	comment(@Body() commentDto: CommentDTO, @Request() { user }: ICurrentUser) {
		return this.commentsService.commentPost(commentDto.contentId, commentDto.body, user.username);
	}

	@Post('replies')
	replies(@Body() replyDTO: ReplyDTO, @Request() { user }: ICurrentUser) {
		return this.commentsService.replyComment(replyDTO.contentId, replyDTO.body, user.username);
	}

	@Delete(':id')
	deleteComment(@Param() { id }) {
        return this.commentsService.deleteComment(id);
	}
	
	@Delete('replies/:id')
	deleteReply(@Param() { id }) {
        return this.commentsService.deleteComment(id);
    }
}
