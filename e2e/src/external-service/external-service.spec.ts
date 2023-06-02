import ampq from 'amqplib';
import { PgProvider } from '../../../src/app/db/pg.provider';
import { wait } from '../utils/wait';
import { v4 } from 'uuid';
const QUEUE_NAME = 'task_queue';

let channel;
let connection;
let taskId;
const dbProvider = new PgProvider();

beforeAll(async () => {
  taskId = v4();
  connection = await ampq.connect('amqp://localhost:5672');
  channel = await connection.createChannel();

  await channel.assertQueue(QUEUE_NAME, { durable: false });
});

afterAll(async () => {
  // close the channel and connection
  await channel.close();
  await connection.close();
});

describe('External provider', () => {
  it('should create task record in the database', async () => {
    const message = {
      pattern: 'task:created',
      data: {
        id: taskId,
        title: 'test External',
        provider: 'External',
      },
    };

    await channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));
    // wait for the message to be processed
    await wait(500);

    const raw = await dbProvider.query(
      'SELECT * FROM task WHERE external_id = $1',
      [message.data.id]
    );

    expect(raw.rows[0]).toMatchObject({
      external_id: message.data.id,
      title: message.data.title,
      external_provider: message.data.provider,
    });
  });

  it('should update task record in the database', async () => {
    const message = {
      pattern: 'task:updated',
      data: {
        id: taskId,
        title: 'Name changed',
        provider: 'External',
        status: 'DONE',
      },
    };

    await channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));

    // wait for the message to be processed
    await wait(500);

    const raw = await dbProvider.query(
      'SELECT * FROM task WHERE external_id = $1',
      [message.data.id]
    );

    expect(raw.rows[0]).toMatchObject({
      external_id: message.data.id,
      title: message.data.title,
      external_provider: message.data.provider,
      status: message.data.status,
    });
  });
});
