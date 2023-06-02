import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CreateTaskUseCase } from '../../use-cases/create-task.use-case';
import { CreateTaskInput } from '../input/create-task.input';
import { MarkTaskAsDoneUseCase } from '../../use-cases/mark-task-as-done.use-case';
import { AddTaskToListUseCase } from '../../use-cases/add-task-to-list.use-case';

@Resolver()
export class TaskMutation {
  @Inject(CreateTaskUseCase)
  private readonly createTaskUseCase: CreateTaskUseCase;

  @Inject(MarkTaskAsDoneUseCase)
  private readonly markTaskAsDoneUseCase: MarkTaskAsDoneUseCase;

  @Inject(AddTaskToListUseCase)
  private readonly addTaskToListUseCase: AddTaskToListUseCase;

  @Mutation(() => Boolean)
  async createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.createTaskUseCase.execute(createTaskInput);
  }

  @Mutation(() => Boolean)
  async markTaskAsDone(@Args('id') id: number) {
    return this.markTaskAsDoneUseCase.execute(id);
  }

  @Mutation(() => Boolean)
  async addTaskToList(@Args('id') id: number, @Args('listId') listId: number) {
    return this.addTaskToListUseCase.execute(id, listId);
  }
}
