import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

import {
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateUserDto } from './dto/create-user.dto';
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @ApiCreatedResponse({
    description: 'created User As Response',
    type: User,
  })
  @Post()
  async CreateUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    if (user) {
      return user;
    }
  }
  
  
  @ApiCreatedResponse({
    description: 'Login User As Response',
    schema: {
      example: {
        admin: {
          id: 1,
          username: 'user1',
          email: 'user@example.com',
          password: 'hashedpasswprd',
          // Add other properties here as needed
        },
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'UnAuthorized User Email Or Passowrd Not Correct',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com',
          description: 'The email of the user',
        },
        password: {
          type: 'string',
          example: 'password123',
          description: 'The password of the user',
        },
      },
    },
  })
  @UseGuards(AuthGuard('local-user'))
  @Post('login')
  login(@Request() req) {
    return req.user;
  }

  @ApiCreatedResponse({ description: 'Get All Users', type: [User] })
  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.userService.findAll(query);
  }
}
