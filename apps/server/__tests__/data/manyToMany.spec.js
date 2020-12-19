const knex = require('../../data/dbConfig.js');

describe('Many-to-Many Tables', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    done();
  });

  describe('Work_Categories Table', () => {
    beforeAll(async (done) => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      done();
    });

    test('should query work_categories table: return empty array', async (done) => {
      const result = await knex.select().table('work_categories');
      expect(result).toEqual([]);
      done();
    });

    test('should query work_categories table: return seeded work_categories', async (done) => {
      await knex.seed.run();
      const workCategories = await knex.select().table('work_categories');
      expect(workCategories[0].id).toEqual(1);
      done();
    });
  });

  describe('Quote_Categories Table', () => {
    beforeAll(async (done) => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      done();
    });

    test('should query quote_categories table: return empty array', async (done) => {
      const result = await knex.select().table('quote_categories');
      expect(result).toEqual([]);
      done();
    });

    test('should query quote_categories table: return seeded quote_categories', async (done) => {
      await knex.seed.run();
      const quoteCategories = await knex.select().table('quote_categories');
      expect(quoteCategories[0].id).toEqual(1);
      done();
    });
  });

  describe('Quote_Collections Table', () => {
    beforeAll(async (done) => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      done();
    });

    test('should query quote_collections table: return empty array', async (done) => {
      const result = await knex.select().table('quote_collections');
      expect(result).toEqual([]);
      done();
    });

    test('should query quote_collections table: return seeded quote_collections', async (done) => {
      await knex.seed.run();
      const quoteCollections = await knex.select().table('quote_collections');
      expect(quoteCollections[0].id).toEqual(1);
      done();
    });
  });

  afterAll(async (done) => {
    await knex.migrate.rollback();
    await knex.destroy();
    done();
  });
});
