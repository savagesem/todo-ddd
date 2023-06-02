import { Inject } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';

interface GetAllTaskInput {
  listId?: number;
  status?: string;
  limit?: number;
  offset?: number;
}

export class GetAllTasksUseCase {
  @Inject()
  private readonly taskRepository: TaskRepository;

  public async execute(input: GetAllTaskInput) {
    return this.taskRepository.getAll(input);
  }
}
