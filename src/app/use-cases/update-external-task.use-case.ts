import { Inject } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { TaskStatus } from '../entity/task.entity';

interface UpdateTaskInput {
  status?: string;
  title?: string;
  externalId: string;
  externalProvider: string;
}

export class UpdateExternalTaskUseCase {
  @Inject()
  private readonly taskRepository: TaskRepository;

  public async execute(input: UpdateTaskInput) {
    const task = await this.taskRepository.getByExternalId(
      input.externalId,
      input.externalProvider
    );
    if (
      input.status &&
      !Object.values(TaskStatus).includes(input.status as TaskStatus)
    ) {
      throw new Error('Invalid status');
    }

    task.updateTask({ status: input.status as TaskStatus, title: input.title });

    const res = await this.taskRepository.save(task);
    return res.rowCount > 0;
  }
}
