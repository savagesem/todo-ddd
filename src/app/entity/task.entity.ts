import { BaseEntity, BaseEntityProps } from './base.entity';

export enum TaskStatus {
  OPEN = 'OPEN',
  DONE = 'DONE',
}

interface TaskProps extends BaseEntityProps {
  title: string;
  listId?: number;
  status?: TaskStatus;
  externalId?: string;
  externalProvider?: string;
}
export class TaskEntity extends BaseEntity {
  title: string;
  listId?: number;
  status: TaskStatus;
  externalId?: string;
  externalProvider?: string;

  constructor(props: TaskProps) {
    super({
      id: props.id,
      created: props.created,
      updated: props.updated,
      deleted: props.deleted,
    });
    this.title = props.title;
    this.listId = props.listId;
    this.status = props.status || TaskStatus.OPEN;
    this.externalId = props.externalId;
    this.externalProvider = props.externalProvider;
  }

  public static create(props: TaskProps) {
    return new TaskEntity(props);
  }

  public markAsDone() {
    this.status = TaskStatus.DONE;
    this.update();
  }

  public addToTheList(listId: number) {
    this.listId = listId;
    this.update();
  }
}
