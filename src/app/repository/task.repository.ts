import { TaskEntity } from '../entity/task.entity';
import { Inject } from '@nestjs/common';
import { PgProvider } from '../db/pg.provider';
import { TaskMapper } from '../mapper/task.mapper';

interface GetAllTaskInput {
  listId?: number;
  status?: string;
  limit?: number;
  offset?: number;
}

const TABLE_NAME = 'task';

export class TaskRepository {
  @Inject()
  private readonly pgProvider: PgProvider;

  save(entity: TaskEntity) {
    const { id, ...dbRecord } = TaskMapper.toDb(entity);
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

  public async getById(id: number) {
    const res = await this.pgProvider.query(
      `Select * from ${TABLE_NAME} where id = $1`,
      [id]
    );

    if (res.rowCount === 0) {
      throw new Error('Task not found');
    }

    return TaskEntity.create(TaskMapper.toEntity(res.rows[0]));
  }

  public async getByExternalId(externalId: string, externalProvider: string) {
    const res = await this.pgProvider.query(
      `Select * from ${TABLE_NAME} where external_id = $1 AND external_provider = $2`,
      [externalId, externalProvider]
    );

    if (res.rowCount === 0) {
      throw new Error('Task not found');
    }

    return TaskEntity.create(TaskMapper.toEntity(res.rows[0]));
  }

  public async getAll({
    listId = null,
    status = null,
    limit = 10,
    offset = 0,
  }: GetAllTaskInput): Promise<TaskEntity[]> {
    const res = await this.pgProvider.query(
      `
        Select * from ${TABLE_NAME}
        where ($3::text IS NULL OR status = $3) 
          AND ($4::integer IS NULL OR list_id = $4)
        Order By created_at
        Limit $1 offset $2
    `,
      [limit, offset, status, listId]
    );

    return res.rows.map(TaskMapper.toEntity);
  }
}
