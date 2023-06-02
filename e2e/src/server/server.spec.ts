import ampq from 'amqplib';

const QUEUE_NAME = 'task_queue';

let channel;
let connection;
beforeAll(async () => {
  connection = await ampq.connect('amqp://localhost:5672');
  channel = await connection.createChannel();

  await channel.assertQueue(QUEUE_NAME, { durable: false });
});

afterAll(async () => {
  // close the channel and connection
  await channel.close();
  await connection.close();
});
describe('Rabbit mq test', () => {
  it('should send task created event message to RabbitMQ', async () => {
    const data = {
      pattern: 'task:created',
      data: {
        id: '1234567',
        title: 'test External',
        provider: 'External',
      },
    };

    await channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)));
  });

  it('should send task updated event message to RabbitMQ', async () => {
    const data = {
      pattern: 'task:updated',
      data: {
        id: '1234567',
        title: 'test External2',
        provider: 'External',
        status: 'DONE',
      },
    };

    await channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)));
  });
});
