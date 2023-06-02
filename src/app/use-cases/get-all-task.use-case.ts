import { Inject } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { TaskEntity } from '../entity/task.entity';

interface GetAllTaskInput {
  status?: string;
}

export class GetAllTasksUseCase {
  @Inject()
  private readonly taskRepository: TaskRepository;

  public async execute(input: GetAllTaskInput) {
    return this.taskRepository.getAll();
  }
}
