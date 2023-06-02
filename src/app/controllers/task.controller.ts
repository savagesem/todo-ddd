import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateTaskUseCase } from '../use-cases';
import { UpdateExternalTaskUseCase } from '../use-cases/update-external-task.use-case';

interface TaskCreatedPayload {
  id: string;
  provider: string;
  title: string;
  status: string;
}

interface TaskUpdatedPayload {
  id: string;
  provider: string;
  title: string;
  status: string;
}

@Controller()
export class TaskController {
  @Inject(CreateTaskUseCase)
  private readonly createTaskUseCase: CreateTaskUseCase;

  @Inject(UpdateExternalTaskUseCase)
  private readonly updateExternalTaskUseCase: UpdateExternalTaskUseCase;

  @MessagePattern('task:created')
  handleTaskCreated(
    @Payload() data: TaskCreatedPayload,
    @Ctx() context: RmqContext
  ) {
    /*
    Here we can add message structure validation
     */
    if (data) {
      return this.createTaskUseCase.execute({
        externalId: data.id,
        externalProvider: data.provider,
        title: data.title,
      });
    }
  }

  @MessagePattern('task:updated')
  handleTaskUpdated(
    @Payload() data: TaskUpdatedPayload,
    @Ctx() context: RmqContext
  ) {
    /*
    Here we can add message structure validation
     */
    if (data) {
      return this.updateExternalTaskUseCase.execute({
        externalId: data.id,
        externalProvider: data.provider,
        title: data.title,
        status: data.status,
      });
    }
  }
}
