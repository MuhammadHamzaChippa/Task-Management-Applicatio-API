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
import { CommentsService } from './comments.service';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guard';
import { CreateComment } from 'src/tasks/dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('Comment')
@UseGuards(JwtGuard)
export class CommentsController {
  constructor(private comments: CommentsService) {}

  @Get(':id')
  getComment(@Param('id', ParseIntPipe) id: number) {
    return this.comments.getComment(id);
  }

  @Patch(':id')
  editComment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() dto: CreateComment,
  ) {
    return this.comments.editComment(userId, commentId, dto);
  }

  @Delete(':id')
  deleteComment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.comments.deleteComment(userId, commentId);
  }
}
