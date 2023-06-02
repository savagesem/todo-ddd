import axios from 'axios';
import { v4 } from 'uuid';

const url = 'http://localhost:3005/graphql';

describe('create-task', () => {
  it('Should create task', async () => {
    const taskTitle = v4();
    const res = await axios.post(url, {
      query: `
      mutation{
        createTask(createTaskInput:{title: "${taskTitle}"})
      }
      `,
    });

    expect(res.data.data.createTask).toEqual(true);

    const queryRes = await axios.post(url, {
      query: `
      query{
        tasks(input:{limit: 50}){
        id
        title
        status
        listId
      }
    }
      `,
    });

    const expectedTask = queryRes.data.data.tasks.find(
      (task) => task.title === taskTitle
    );

    expect(expectedTask).toMatchObject({
      title: taskTitle,
    });
  });
});
