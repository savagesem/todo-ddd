import { TaskEntity } from '../entity/task.entity';
import { Inject } from '@nestjs/common';
import { PgProvider } from '../db/pg.provider';
import { TaskMapper } from '../mapper/task.mapper';

interface GetAllTaskInput {
  status?: string;
  limit?: number;
  offset?: number;
}

export class TaskRepository {
  @Inject()
  private readonly pgProvider: PgProvider;

  save(task: TaskEntity) {
    const dbRecord = TaskMapper.toDb(task);
    const fields = Object.keys(dbRecord);
    const fieldToValue = fields
      .map((field, index) => `$${index + 1}`)
      .join(', ');
    const values = Object.values(dbRecord);

    if (task.id) {
      return this.pgProvider.query(
        `UPDATE task SET (${fields.join(
          ','
        )}) = (${fieldToValue}) WHERE id = $${values.length + 1}`,
        [...values, task.id]
      );
    } else {
      return this.pgProvider.query(
        `INSERT INTO task (${fields.join(',')} ) VALUES (${fieldToValue})`,
        [...values]
      );
    }
  }

  public async getById(id: number) {
    const res = await this.pgProvider.query(
      'Select * from task where id = $1',
      [id]
    );

    if (res.rowCount === 0) {
      throw new Error('Task not found');
    }

    return TaskEntity.create(TaskMapper.toEntity(res.rows[0]));
  }

  public async getAll({
    status = null,
    limit = 10,
    offset = 0,
  }: GetAllTaskInput): Promise<TaskEntity[]> {
    const res = await this.pgProvider.query(
      `
        Select * from task
        where ($3::text IS NULL OR status = $3)
        Order By created_at 
        Limit $1 offset $2
    `,
      [limit, offset, status]
    );

    return res.rows.map((raw) => TaskEntity.create(raw));
  }
}
