const knex = require('../../data/dbConfig.js');

describe('Collections Table', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    done();
  });

  test('should query collections table: return empty array', async (done) => {
    const result = await knex.select().table('collections');
    expect(result).toEqual([]);
    done();
  });

  test('should query collections table: return seeded collections', async (done) => {
    await knex.seed.run();
    const collections = await knex.select().table('collections');
    expect(collections[0].id).toEqual(1);
    done();
  });

  afterAll(async (done) => {
    await knex.migrate.rollback();
    await knex.destroy();
    done();
  });
});
