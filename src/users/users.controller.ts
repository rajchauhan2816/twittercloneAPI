import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ICurrentUser } from './../auth/currentuser';
import { CreateUserDTO } from './user.dto';
import { UsersService } from './users.service';
import { Controller, Post, Body, Delete, Request, UseGuards, Put, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {}

	@Post()
	createUser(@Body() createUserDto: CreateUserDTO) {
		return this.userService.add(
			createUserDto.username,
			createUserDto.password,
			createUserDto.name,
			createUserDto.age
		);
	}

	@UseGuards(JwtAuthGuard)
	@Delete()
	deleteUser(@Request() { user }: ICurrentUser) {
		return this.userService.delete(user.username);
	}

	@UseGuards(JwtAuthGuard)
	@Put()
	updateProfile(@Request() { user }: ICurrentUser, @Body() body: any) {
		return this.userService.setProfilePicture(user.username, body.profilePicture);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	getUser(@Request() { user }: ICurrentUser) {
		return this.userService.findOne(user.username);
	}

	@Get(':username')
	getUserByUsername(@Param() { username }) {
		return this.userService.findOne(username);
	}
}
