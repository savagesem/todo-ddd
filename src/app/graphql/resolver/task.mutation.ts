import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CreateTaskUseCase } from '../../use-cases/create-task.use-case';
import { CreateTaskInput } from '../input/create-task.input';
import { MarkTaskAsDoneUseCase } from '../../use-cases/mark-task-as-done.use-case';

@Resolver()
export class TaskMutation {
  @Inject(CreateTaskUseCase)
  private readonly createTaskUseCase: CreateTaskUseCase;

  @Inject(MarkTaskAsDoneUseCase)
  private readonly markTaskAsDoneUseCase: MarkTaskAsDoneUseCase;

  @Mutation(() => Boolean)
  async createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.createTaskUseCase.execute(createTaskInput);
  }

  @Mutation(() => Boolean)
  async markTaskAsDone(@Args('id') id: number) {
    return this.markTaskAsDoneUseCase.execute(id);
  }
}
