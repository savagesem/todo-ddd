import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CreateTaskUseCase } from '../../use-cases/create-task.use-case';
import { CreateTaskInput } from '../input/create-task.input';

@Resolver()
export class TaskMutation {
  @Inject(CreateTaskUseCase)
  private readonly createTaskUseCase: CreateTaskUseCase;

  @Mutation(() => Boolean)
  async createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.createTaskUseCase.execute(createTaskInput);
  }
}
