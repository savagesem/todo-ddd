import { ListEntity } from '../entity/list.entity';
import { List } from '../graphql/models/list';

export class ListMapper {
  public static toDb(entity: ListEntity) {
    return {
      id: entity.id,
      name: entity.name,
      created_at: entity.created,
      updated_at: entity.updated,
      deleted_at: entity.deleted,
    };
  }

  public static toEntity(raw: any) {
    return ListEntity.create({
      id: raw.id,
      name: raw.name,
      created: raw.created_at,
      deleted: raw.deleted_at,
      updated: raw.updated_at,
    });
  }

  public static toGraphql(entity: ListEntity): List {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}
