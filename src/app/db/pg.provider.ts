import { Pool } from 'pg';
import { Logger } from '@nestjs/common';

class Query {
  query: string;
  params?: any[];
}
export class PgProvider {
  private pool: Pool;
  private readonly logger = new Logger(PgProvider.name);
  constructor() {
    this.pool = new Pool({
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: 'postgres',
    });
  }

  public async query(query: string, params?: any[]) {
    this.logger.debug(`${query} ${params}`);
    return this.pool.query(query, params);
  }

  public async transaction(query: Query[]) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      for (const q of query) {
        await client.query(q.query, q.params);
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}
