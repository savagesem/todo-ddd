import { Task } from '../models/task';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { GetAllTasksUseCase } from '../../use-cases/get-all-task.use-case';
import { TaskMapper } from '../../mapper/task.mapper';
import { GetTasksInput } from '../input/get-tasks.input';

@Resolver()
export class TaskQuery {
  @Inject(GetAllTasksUseCase)
  private readonly getAllTasksUseCase: GetAllTasksUseCase;
  @Query(() => [Task])
  async tasks(@Args('input') input: GetTasksInput) {
    const res = await this.getAllTasksUseCase.execute(input);
    return res.map((task) => TaskMapper.toGraphql(task));
  }
}
