export interface BaseEntityProps {
  id?: number;
  created?: Date;
  updated?: Date;
  deleted?: Date;
}
export abstract class BaseEntity {
  id: number;
  created: Date;
  updated: Date;
  deleted: Date;

  protected constructor(props: BaseEntityProps) {
    this.id = props.id;
    this.created = props.created;
    this.updated = props.updated;
    this.deleted = props.deleted;
    if (!props.id) {
      this.created = new Date();
    }
  }

  public delete() {
    this.deleted = new Date();
  }

  public update() {
    this.updated = new Date();
  }
}
