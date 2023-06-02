import { Inject } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';

export class AddTaskToListUseCase {
  @Inject()
  private readonly taskRepository: TaskRepository;

  public async execute(id: number, listId: number) {
    const task = await this.taskRepository.getById(id);
    task.addToTheList(listId);

    const res = await this.taskRepository.save(task);
    return res.rowCount > 0;
  }
}
