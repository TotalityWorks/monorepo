const supertest = require('supertest');
const server = require('../index.js');

const request = supertest(server);
test('environment should be test', () => {
  expect(process.env.NODE_ENV).toBe('test');
  expect(process.env.NODE_ENV).not.toBe('development');
});

describe('Server Tests', () => {
  test('server should be running', async (done) => {
    const result = await request
      .get('/');
    expect(result.text).toEqual('Server is running.');
    done();
  });
});

afterAll((done) => {
  server.close();
  done();
});
