const graphql = require('graphql');
const knex = require('../../data/dbConfig.js');
const getAuthor = require('../../api/authors/queries/getAuthor.js');
const getAuthors = require('../../api/authors/queries/getAuthors.js');

describe('Author Queries', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    done();
  });

  describe('getAuthor Query', () => {
    test('should verify that the arguments are correct', async (done) => {
      const { args } = getAuthor;
      expect(JSON.stringify(getAuthor.type)).toEqual('"Author"');
      expect(args.id.type).toMatchObject(graphql.GraphQLID);
      expect(args.name.type).toMatchObject(graphql.GraphQLString);
      expect(args.century.type).toMatchObject(graphql.GraphQLString);
      expect(args.location.type).toMatchObject(graphql.GraphQLString);
      done();
    });

    test('should return a single author', async (done) => {
      const parent = null;
      const args = { id: 1 };
      const result = await getAuthor.resolve(parent, args);
      expect(result).toEqual({
        id: 1,
        name: '+ICXC',
        century: '1st',
        location: 'Judea',
        bio: 'The Holy Adored King Jesus Christ, the only begotten Son of God.',
      });
      done();
    });

    test('should return an error', async (done) => {
      const parent = null;
      const args = { id: 2 };
      const result = await getAuthor.resolve(parent, args);
      expect(result).toEqual(undefined);
      done();
    });
  });

  describe('getAuthors Query', () => {
    test('should verify that the arguments are correct', async (done) => {
      const { args } = getAuthors;
      expect(JSON.stringify(getAuthors.type)).toEqual('"Author"');
      expect(args.id.type).toMatchObject(graphql.GraphQLID);
      expect(args.name.type).toMatchObject(graphql.GraphQLString);
      expect(args.century.type).toMatchObject(graphql.GraphQLString);
      expect(args.location.type).toMatchObject(graphql.GraphQLString);
      done();
    });

    test('should return an array of authors', async (done) => {
      const parent = null;
      const args = null;
      const result = await getAuthors.resolve(parent, args);
      expect(result).toEqual([{
        id: 1,
        name: '+ICXC',
        century: '1st',
        location: 'Judea',
        bio: 'The Holy Adored King Jesus Christ, the only begotten Son of God.',
      }]);
      done();
    });

    test('should return an array of authors by argument: century', async (done) => {
      const parent = null;
      const args = { century: '1st' };
      const result = await getAuthors.resolve(parent, args);
      expect(result).toEqual([{
        id: 1,
        name: '+ICXC',
        century: '1st',
        location: 'Judea',
        bio: 'The Holy Adored King Jesus Christ, the only begotten Son of God.',
      }]);
      done();
    });

    test('should return an array of authors by argument: location', async (done) => {
      const parent = null;
      const args = { location: 'Judea' };
      const result = await getAuthors.resolve(parent, args);
      expect(result).toEqual([{
        id: 1,
        name: '+ICXC',
        century: '1st',
        location: 'Judea',
        bio: 'The Holy Adored King Jesus Christ, the only begotten Son of God.',
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
