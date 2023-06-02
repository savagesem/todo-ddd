import { Task } from '../models/task';
import { Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { GetAllTasksUseCase } from '../../use-cases/get-all-task.use-case';
import { TaskMapper } from '../../mapper/task.mapper';

@Resolver()
export class TaskQuery {
  @Inject(GetAllTasksUseCase)
  private readonly getAllTasksUseCase: GetAllTasksUseCase;
  @Query(() => [Task])
  async tasks() {
    const res = await this.getAllTasksUseCase.execute({});
    return res.map((task) => TaskMapper.toGraphql(task));
  }
}
