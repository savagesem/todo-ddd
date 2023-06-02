import { TaskEntity } from '../entity/task.entity';
import { Inject } from '@nestjs/common';
import { PgProvider } from '../db/pg.provider';
import { TaskMapper } from '../mapper/task.mapper';

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

    return this.pgProvider.query(
      `INSERT INTO task (${fields.join(',')} ) VALUES (${fieldToValue})`,
      [...values]
    );
  }

  public async getById(id: number) {
    const res = await this.pgProvider.query(
      'Select * from task where id = $1',
      [id]
    );

    if (res.rowCount === 0) {
      throw new Error('Task not found');
    }

    return TaskEntity.create(res.rows[0]);
  }

  public async getAll(): Promise<TaskEntity[]> {
    const res = await this.pgProvider.query('Select * from task');

    return res.rows.map((raw) => TaskEntity.create(raw));
  }
}
