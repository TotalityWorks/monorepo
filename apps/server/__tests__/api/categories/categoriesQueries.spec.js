const graphql = require('graphql');
const knex = require('../../../data/dbConfig.js');
const getCategory = require('../../../api/categories/queries/getCategory.js');
const getCategories = require('../../../api/categories/queries/getCategories.js');

describe('Category Queries', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    done();
  });

  describe('getCategory Query', () => {
    test('should verify that the arguments are correct', async (done) => {
      const { args } = getCategory;
      expect(JSON.stringify(getCategory.type)).toEqual('"Category"');
      expect(args.id.type).toMatchObject(graphql.GraphQLID);
      expect(args.name.type).toMatchObject(graphql.GraphQLString);
      done();
    });

    test('should return a single category: by ID', async (done) => {
      const parent = null;
      const args = { id: 1 };
      const result = await getCategory.resolve(parent, args);
      expect(result).toEqual({
        id: 1,
        name: 'Theology',
        description: 'The study of God',
      });
      done();
    });

    test('should return a single category: by name', async (done) => {
      const parent = null;
      const args = { name: 'Theology' };
      const result = await getCategory.resolve(parent, args);
      expect(result).toEqual({
        id: 1,
        name: 'Theology',
        description: 'The study of God',
      });
      done();
    });

    test('should return an error', async (done) => {
      const parent = null;
      const args = { id: 2 };
      const result = await getCategory.resolve(parent, args);
      expect(result).toEqual(undefined);
      done();
    });
  });

  describe('getCategories Query', () => {
    test('should verify that the arguments are correct', async (done) => {
      const { args } = getCategories;
      expect(JSON.stringify(getCategories.type)).toEqual('"Category"');
      expect(args.id.type).toMatchObject(graphql.GraphQLID);
      expect(args.name.type).toMatchObject(graphql.GraphQLString);
      expect(args.description.type).toMatchObject(graphql.GraphQLString);
      done();
    });

    test('should return an array of categories', async (done) => {
      const parent = null;
      const args = null;
      const result = await getCategories.resolve(parent, args);
      expect(result).toEqual([
        {
          id: 1,
          name: 'Theology',
          description: 'The study of God',
        },
      ]);
      done();
    });

    test('should return an array of categories: by name', async (done) => {
      const parent = null;
      const args = { name: 'Theology' };
      const result = await getCategories.resolve(parent, args);
      expect(result).toEqual([
        {
          id: 1,
          name: 'Theology',
          description: 'The study of God',
        },
      ]);
      done();
    });
  });

  afterAll(async (done) => {
    await knex.migrate.rollback();
    await knex.destroy();
    done();
  });
});
