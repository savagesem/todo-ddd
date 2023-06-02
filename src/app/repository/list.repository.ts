import { Inject } from '@nestjs/common';
import { PgProvider } from '../db/pg.provider';
import { ListEntity } from '../entity/list.entity';
import { ListMapper } from '../mapper/list.mapper';

const TABLE_NAME = 'list';

interface GetAllListInput {
  limit?: number;
  offset?: number;
}

export class ListRepository {
  @Inject()
  private readonly pgProvider: PgProvider;

  save(entity: ListEntity) {
    const { id, ...dbRecord } = ListMapper.toDb(entity);

    const fields = Object.keys(dbRecord);
    const fieldToValue = fields
      .map((field, index) => `$${index + 1}`)
      .join(', ');
    const values = Object.values(dbRecord);

    if (entity.id) {
      return this.pgProvider.query(
        `UPDATE ${TABLE_NAME} SET (${fields.join(
          ','
        )}) = (${fieldToValue}) WHERE id = $${values.length + 1}`,
        [...values, entity.id]
      );
    } else {
      return this.pgProvider.query(
        `INSERT INTO ${TABLE_NAME} (${fields.join(
          ','
        )} ) VALUES (${fieldToValue})`,
        [...values]
      );
    }
  }

  public async getAll({
    limit = 10,
    offset = 0,
  }: GetAllListInput): Promise<ListEntity[]> {
    const res = await this.pgProvider.query(
      `
        Select * from ${TABLE_NAME}
        Order By created_at
        Limit $1 offset $2
    `,
      [limit, offset]
    );

    return res.rows.map(ListMapper.toEntity);
  }
}
