const knex = require('../../data/dbConfig.js');

describe('Categories Table', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    done();
  });

  test('should query categories table: return empty array', async (done) => {
    const result = await knex.select().table('categories');
    expect(result).toEqual([]);
    done();
  });

  test('should query categories table: return seeded categories', async (done) => {
    await knex.seed.run();
    const categories = await knex.select().table('categories');
    expect(categories[0].id).toEqual(1);
    done();
  });

  afterAll(async (done) => {
    await knex.migrate.rollback();
    await knex.destroy();
    done();
  });
});
