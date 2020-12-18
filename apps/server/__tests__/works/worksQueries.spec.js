const graphql = require('graphql');
const knex = require('../../data/dbConfig.js');
const getWork = require('../../api/works/queries/getWork.js');
const getWorks = require('../../api/works/queries/getWorks.js');

describe('Work Queries', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    done();
  });

  describe('getWork Query', () => {
    test('should verify that the arguments are correct', async (done) => {
      const { args } = getWork;
      expect(JSON.stringify(getWork.type)).toEqual('"Work"');
      expect(args.id.type).toMatchObject(graphql.GraphQLID);
      expect(args.title.type).toMatchObject(graphql.GraphQLString);
      expect(args.date.type).toMatchObject(graphql.GraphQLString);
      done();
    });

    test('should return single work: by ID', async (done) => {
      const parent = null;
      const args = { id: 1 };
      const result = await getWork.resolve(parent, args);
      expect(result).toEqual({
        id: 1,
        title: 'The Holy Scriptures',
        date: '1st Century',
        author_id: 1,
        categories: [
          1,
        ],
      });
      done();
    });

    test('should return single work: by Title', async (done) => {
      const parent = null;
      const args = { title: 'The Holy Scriptures' };
      const result = await getWork.resolve(parent, args);
      expect(result).toEqual({
        id: 1,
        title: 'The Holy Scriptures',
        date: '1st Century',
        author_id: 1,
        categories: [
          1,
        ],
      });
      done();
    });
  });

  describe('getWorks Query', () => {
    test('should verify that the arguments are correct', async (done) => {
      const { args } = getWorks;
      expect(JSON.stringify(getWorks.type)).toEqual('"Work"');
      expect(args.id.type).toMatchObject(graphql.GraphQLID);
      expect(args.title.type).toMatchObject(graphql.GraphQLString);
      expect(args.date.type).toMatchObject(graphql.GraphQLString);
      done();
    });

    test('should return an array of all works.', async (done) => {
      const parent = null;
      const args = null;
      const result = await getWorks.resolve(parent, args);
      expect(result).toEqual([{
        id: 1,
        title: 'The Holy Scriptures',
        date: '1st Century',
        author_id: 1,
        categories: [
          1,
        ],
      }]);
      done();
    });

    test('should return an array of works by author: id', async (done) => {
      const parent = null;
      const args = { author_id: 1 };
      const result = await getWorks.resolve(parent, args);
      expect(result).toEqual([{
        id: 1,
        title: 'The Holy Scriptures',
        date: '1st Century',
        author_id: 1,
      }]);
      done();
    });

    test('should return an array of works: by date', async (done) => {
      const parent = null;
      const args = { date: '1st Century' };
      const result = await getWorks.resolve(parent, args);
      expect(result).toEqual([{
        id: 1,
        title: 'The Holy Scriptures',
        date: '1st Century',
        author_id: 1,
        categories: [
          1,
        ],
      }]);
      done();
    });
  });

  afterAll(async (done) => {
    await knex.migrate.rollback();
    await knex.destroy();
    done();
  });
});
