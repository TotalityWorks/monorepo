const supertest = require('supertest');
const server = require('../index.js');

const request = supertest(server);

test('environment should be test', () => {
  expect(process.env.NODE_ENV).toBe('test');
  expect(process.env.NODE_ENV).not.toBe('development');
});

describe('Basic Server Tests', () => {
  test('server should be running', async (done) => {
    const result = await request.get('/');
    expect(result.text).toEqual('Server is running.');
    done();
  });

  test('should access graphql endpoint', async (done) => {
    const result = await request.get('/graphql');
    const { errors } = JSON.parse(result.text);
    expect(errors[0].message).toEqual('Must provide query string.');
    done();
  });
});

afterAll((done) => {
  server.close();
  done();
});
