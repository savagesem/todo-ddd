import { TaskEntity } from '../entity/task.entity';
import { Task } from '../graphql/models/task';

export class TaskMapper {
  public static toDb(task: TaskEntity) {
    return {
      title: task.title,
      status: task.status,
      external_id: task.externalId,
      external_provider: task.externalProvider,
      created_at: task.created,
      updated_at: task.updated,
      deleted_at: task.deleted,
    };
  }

  public static toEntity(task: any) {
    return TaskEntity.create({
      created: task.created_at,
      deleted: task.deleted_at,
      externalId: task.external_id,
      externalProvider: task.external_provider,
      id: task.id,
      status: task.status,
      title: task.title,
      updated: task.updated_at,
    });
  }

  public static toGraphql(task: TaskEntity): Task {
    return {
      id: task.id,
      title: task.title,
      status: task.status,
    };
  }
}
