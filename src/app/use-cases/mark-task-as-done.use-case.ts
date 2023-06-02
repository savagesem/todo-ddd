import { Inject } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';

export class MarkTaskAsDoneUseCase {
  @Inject()
  private readonly taskRepository: TaskRepository;

  public async execute(id: number) {
    const task = await this.taskRepository.getById(id);
    task.markAsDone();

    const res = await this.taskRepository.save(task);
    return res.rowCount > 0;
  }
}
