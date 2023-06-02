import { BaseEntity, BaseEntityProps } from './base.entity';

export enum TaskStatus {
  OPEN = 'OPEN',
  DONE = 'DONE',
}

interface TaskProps extends BaseEntityProps {
  title: string;
  status?: TaskStatus;
  externalId?: string;
  externalProvider?: string;
}
export class TaskEntity extends BaseEntity {
  title: string;
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
}
