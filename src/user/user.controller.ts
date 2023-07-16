import {
  Controller,
  UseGuards,
  Get,
  Patch,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { EditRole, EditUser } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private user: UserService) {}

  @Get('all')
  getAllUser() {
    return this.user.getAllUser();
  }
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') id: number, @Body() dto: EditUser) {
    return this.user.editUser(id, dto);
  }

  @Patch('role/:id')
  editRole(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) editUserId: number,
    @Body() dto: EditRole,
  ) {
    return this.user.editRole(userId, editUserId, dto);
  }

  @Get('/tasks')
  getTasks(@GetUser('id') userId: number) {
    return this.user.getTasks(userId);
  }

  @Get('/asignedTasks')
  getAssignedTasks(@GetUser('id') userId: number) {
    return this.user.getAssignedTasks(userId);
  }

  @Get('/comments')
  getComments(@GetUser('id') userId: number) {
    return this.user.getUserComments(userId);
  }
}
