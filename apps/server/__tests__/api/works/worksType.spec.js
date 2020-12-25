const graphql = require('graphql');
const knex = require('../../../data/dbConfig.js');
const { workType, authorType, quoteType } = require('../../../api/types.js');

describe('Work GraphQL Type', () => {
  test('should verify that the fields are correct', async (done) => {
    const fields = workType.getFields();
    const name = '"Work"';
    expect(JSON.stringify(workType)).toEqual(name);
    expect(fields).toHaveProperty('id');
    expect(fields.id.type).toMatchObject(
      new graphql.GraphQLNonNull(graphql.GraphQLID)
    );
    expect(fields).toHaveProperty('title');
    expect(fields.title.type).toMatchObject(
      new graphql.GraphQLNonNull(graphql.GraphQLString)
    );
    expect(fields).toHaveProperty('date');
    expect(fields.date.type).toMatchObject(graphql.GraphQLString);
    expect(fields).toHaveProperty('author');
    expect(fields.author.type).toMatchObject(authorType);
    expect(fields).toHaveProperty('quotes');
    expect(fields.quotes.type).toMatchObject(
      new graphql.GraphQLList(quoteType)
    );
    done();
  });

  describe('Work Type Resolvers', () => {
    beforeAll(async (done) => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      await knex.seed.run();
      done();
    });

    test('should return author information from resolver function', async (done) => {
      const parentId = { id: 1 };
      const args = null;
      const fields = workType.getFields();
      const result = await fields.author.resolve(parentId, args);
      expect(result).toEqual({
        id: 1,
        name: '+ICXC',
        century: '1st',
        location: 'Judea',
        bio: 'The Holy Adored King Jesus Christ, the only begotten Son of God.',
      });
      done();
    });

    test('should return array of quotes from resolver function', async (done) => {
      const parentId = { id: 1 };
      const args = null;
      const fields = workType.getFields();
      const result = await fields.quotes.resolve(parentId, args);
      expect(result).toEqual([
        {
          id: 1,
          text:
            'For God so loved the world, that He gave His only begotten Son, that whosoever believeth in Him should not perish, but have everlasting life.',
          author_id: 1,
          work_id: 1,
        },
      ]);
      done();
    });

    afterAll(async (done) => {
      await knex.migrate.rollback();
      await knex.destroy();
      done();
    });
  });
});
