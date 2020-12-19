const knex = require('../../data/dbConfig.js');

describe('Quotes Table', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    done();
  });

  test('should query quotes table: return empty array', async (done) => {
    const result = await knex.select().table('quotes');
    expect(result).toEqual([]);
    done();
  });

  test('should query quotes table: return seeded quotes', async (done) => {
    await knex.seed.run();
    const quotes = await knex.select().table('quotes');
    expect(quotes[0].id).toEqual(1);
    done();
  });

  afterAll(async (done) => {
    await knex.migrate.rollback();
    await knex.destroy();
    done();
  });
});
