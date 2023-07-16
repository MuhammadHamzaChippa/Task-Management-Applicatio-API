import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtGuard } from 'src/auth/guard';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async getComment(commentId) {
    return this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
  }

  async editComment(userId, commentId, dto) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment || comment.userId !== userId) {
      throw new ForbiddenException('Access to Resource Denied');
    }

    return this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteComment(userId, commentId) {
    return this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
