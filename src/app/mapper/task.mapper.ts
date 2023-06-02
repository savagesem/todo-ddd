import { TaskEntity } from '../entity/task.entity';
import { Task } from '../graphql/models/task';

export class TaskMapper {
  public static toDb(entity: TaskEntity) {
    return {
      id: entity.id,
      title: entity.title,
      list_id: entity.listId,
      status: entity.status,
      external_id: entity.externalId,
      external_provider: entity.externalProvider,
      created_at: entity.created,
      updated_at: entity.updated,
      deleted_at: entity.deleted,
    };
  }

  public static toEntity(task: any) {
    return TaskEntity.create({
      id: task.id,
      status: task.status,
      title: task.title,
      listId: task.list_id,
      externalId: task.external_id,
      externalProvider: task.external_provider,
      created: task.created_at,
      deleted: task.deleted_at,
      updated: task.updated_at,
    });
  }

  public static toGraphql(task: TaskEntity): Task {
    return {
      id: task.id,
      title: task.title,
      status: task.status,
      listId: task.listId,
    };
  }
}
