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
      .get('/graphql');
    const { errors } = JSON.parse(result.text);
    expect(errors[0].message).toEqual('Must provide query string.');
    done();
  });

  describe('should connect to database', () => {
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
    });

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
    });

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
    });

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
    });

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
    });

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
    });

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
