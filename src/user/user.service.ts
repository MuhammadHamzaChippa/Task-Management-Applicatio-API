import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditRole, EditUser } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUser() {
    return this.prisma.user.findMany();
  }
  async editUser(userId: number, dto: EditUser) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
  }

  async editRole(userId: number, editUserId: number, dto: EditRole) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user.role === 'user') {
      throw new ForbiddenException('You are not allowed to edit this user');
    }

    const editUser = await this.prisma.user.findUnique({
      where: {
        id: editUserId,
      },
    });

    if (!editUser) {
      throw new ForbiddenException('Access to Resource Denied');
    }

    return this.prisma.user.update({
      where: {
        id: editUserId,
      },
      data: {
        ...dto,
      },
    });
  }

  async getTasks(userId: number) {
    return this.prisma.task.findMany({
      where: {
        createdById: userId,
      },
    });
  }

  async getAssignedTasks(userId: number) {
    return this.prisma.task.findMany({
      where: {
        assignedToId: userId,
      },
    });
  }

  async getUserComments(userId: number) {
    return this.prisma.comment.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
