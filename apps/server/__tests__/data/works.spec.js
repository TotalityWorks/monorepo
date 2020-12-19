const knex = require('../../data/dbConfig.js');

describe('Works Table', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    done();
  });

  test('should query works table: return empty array', async (done) => {
    const result = await knex.select().table('categories');
    expect(result).toEqual([]);
    done();
  });

  test('should query works table: return seeded works', async (done) => {
    await knex.seed.run();
    const works = await knex.select().table('works');
    expect(works[0].id).toEqual(1);
    done();
  });

  afterAll(async (done) => {
    await knex.migrate.rollback();
    await knex.destroy();
    done();
  });
});
