import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTask, EditTask, CreateComment } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { TasksService } from './tasks.service';
import { GetUser } from 'src/auth/decorators';
import { ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('Task')
@UseGuards(JwtGuard)
export class TasksController {
  constructor(private tasks: TasksService) {}

  @Post('')
  createTask(@GetUser('id') id: number, @Body() dto: CreateTask) {
    return this.tasks.createTask(id, dto);
  }

  @Get(':id')
  getTask(
    @GetUser('id') id: number,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.tasks.getTask(id, taskId);
  }

  @Patch(':id')
  editTask(
    @GetUser('id') id: number,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: EditTask,
  ) {
    return this.tasks.editTask(id, taskId, dto);
  }

  @Delete(':id')
  deleteTask(
    @GetUser('id') id: number,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.tasks.deleteTask(id, taskId);
  }

  @Get(':id/comments')
  getTaskComments(
    @GetUser('id') id: number,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.tasks.getTaskComments(id, taskId);
  }

  @Post(':id/comments')
  createComment(
    @GetUser('id') id: number,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: CreateComment,
  ) {
    return this.tasks.createComment(id, taskId, dto);
  }

  @Patch(':id/assign/:userId')
  assignTask(
    @Param('id', ParseIntPipe) taskId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.tasks.assignTask(taskId, userId);
  }

  @Patch(':id/unassign/:userId')
  unassignTask(
    @Param('id', ParseIntPipe) taskId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.tasks.unassignTask(taskId, userId);
  }
}
