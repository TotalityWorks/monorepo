const knex = require('../../data/dbConfig.js');

describe('Citations Table', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    done();
  });

  test('should query citations table: return empty array', async (done) => {
    const result = await knex.select().table('citations');
    expect(result).toEqual([]);
    done();
  });

  test('should query citations table: return seeded citations', async (done) => {
    await knex.seed.run();
    const citations = await knex.select().table('citations');
    expect(citations[0].id).toEqual(1);
    done();
  });

  afterAll(async (done) => {
    await knex.migrate.rollback();
    await knex.destroy();
    done();
  });
});
