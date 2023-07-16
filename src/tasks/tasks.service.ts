import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTask, EditTask, CreateComment } from './dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(createdById: number, dto: CreateTask) {
    return this.prisma.task.create({
      data: {
        ...dto,
        createdById,
      },
    });
  }

  async getTask(userId: number, taskId: number) {
    return this.prisma.task.findFirst({
      where: {
        id: taskId,
        createdById: userId,
      },
    });
  }

  async deleteTask(userId: number, taskId: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task || task.createdById !== userId) {
      throw new ForbiddenException('Access to Resource Denied');
    }

    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }

  async editTask(userId: number, taskId: number, dto: EditTask) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task || task.createdById !== userId) {
      throw new ForbiddenException('Access to Resource Denied');
    }

    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...dto,
      },
    });
  }

  async getTaskComments(userId: number, taskId: number) {
    const comments = await this.prisma.comment.findMany({
      where: {
        taskId: taskId,
      },
    });

    return comments;
  }

  async createComment(userId: number, taskId: number, dto: CreateComment) {
    return this.prisma.comment.create({
      data: {
        ...dto,
        taskId,
        userId,
      },
    });
  }

  async assignTask(taskId, userId) {
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        assignedToId: userId,
      },
    });
  }

  async unassignTask(taskId, userId) {
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        assignedToId: null,
      },
    });
  }
}
