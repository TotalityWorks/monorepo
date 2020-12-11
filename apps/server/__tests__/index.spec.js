const supertest = require('supertest');
const server = require('../index.js');
const knex = require('../data/dbConfig.js');

const request = supertest(server);
test('environment should be test', () => {
  expect(process.env.NODE_ENV).toBe('test');
  expect(process.env.NODE_ENV).not.toBe('development');
});

describe('Basic Server Tests', () => {
  test('server should be running', async (done) => {
    const result = await request
      .get('/');
    expect(result.text).toEqual('Server is running.');
    done();
  });

  test('should access graphql endpoint', async (done) => {
    const result = await request
      .get('/api/graphql');
    const { errors } = JSON.parse(result.text);
    expect(errors[0].message).toEqual('Must provide query string.');
    done();
  });

  describe('should connect to database', () => {
    beforeAll(async (done) => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      done();
    });

    test('should query users table: return empty array', async (done) => {
      const result = await knex.select().table('users');
      expect(result).toEqual([]);
      done();
    });

    test('should query users table: return seeded users', async (done) => {
      await knex.seed.run();
      const users = await knex.select().table('users');
      expect(users[0].id).toEqual(1);
      done();
    });

    afterAll(async (done) => {
      await knex.migrate.rollback();
      await knex.destroy();
      done();
    });
  });
});

afterAll((done) => {
  server.close();
  done();
});
