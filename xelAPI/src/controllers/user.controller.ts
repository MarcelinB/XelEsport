import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Role } from 'src/Role/role.enum';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/services/user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'Returns the list of all users.',
    type: User,
    isArray: true,
  })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns a single user by ID.',
    type: User,
  })
  findById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Public()
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Creates a new user.',
    type: User,
  })
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deletes a user by ID.',
  })
  delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
