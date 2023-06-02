import { Inject } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { TaskEntity } from '../entity/task.entity';

interface CreateTaskInput {
  title: string;
  externalId?: string;
  externalProvider?: string;
}

export class CreateTaskUseCase {
  @Inject()
  private readonly taskRepository: TaskRepository;

  public async execute(input: CreateTaskInput) {
    const task = TaskEntity.create({
      title: input.title,
      externalId: input.externalId,
      externalProvider: input.externalProvider,
    });

    console.log(task);

    const res = await this.taskRepository.save(task);
    return res.rowCount > 0;
  }
}
