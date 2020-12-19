const knex = require('../../data/dbConfig.js');

describe('Authors Table', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    done();
  });

  test('should query authors table: return empty array', async (done) => {
    const result = await knex.select().table('authors');
    expect(result).toEqual([]);
    done();
  });

  test('should query authors table: return seeded authors', async (done) => {
    await knex.seed.run();
    const authors = await knex.select().table('authors');
    expect(authors[0].id).toEqual(1);
    done();
  });

  afterAll(async (done) => {
    await knex.migrate.rollback();
    await knex.destroy();
    done();
  });
});
