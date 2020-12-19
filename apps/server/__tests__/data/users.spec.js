const knex = require('../../data/dbConfig.js');

describe('Users Table', () => {
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
