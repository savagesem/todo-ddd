import { BaseEntity, BaseEntityProps } from './base.entity';

interface ListProps extends BaseEntityProps {
  name: string;
}
export class ListEntity extends BaseEntity {
  name: string;

  private constructor(props: ListProps) {
    super(props);
    this.name = props.name;
  }

  public static create(props: ListProps) {
    return new ListEntity(props);
  }
}
