const graphql = require('graphql');
const knex = require('../../../data/dbConfig.js');
const { categoryType, workType, quoteType } = require('../../../api/types.js');

describe('Category GraphQL Type', () => {
  test('should verify that the fields are correct', async (done) => {
    const fields = categoryType.getFields();
    const name = '"Category"';
    expect(JSON.stringify(categoryType)).toEqual(name);
    expect(fields).toHaveProperty('id');
    expect(fields.id.type).toMatchObject(
      new graphql.GraphQLNonNull(graphql.GraphQLID)
    );
    expect(fields).toHaveProperty('name');
    expect(fields.name.type).toMatchObject(
      new graphql.GraphQLNonNull(graphql.GraphQLString)
    );
    expect(fields).toHaveProperty('description');
    expect(fields.description.type).toMatchObject(graphql.GraphQLString);
    expect(fields).toHaveProperty('works');
    expect(fields.works.type).toMatchObject(new graphql.GraphQLList(workType));
    expect(fields).toHaveProperty('quotes');
    expect(fields.quotes.type).toMatchObject(
      new graphql.GraphQLList(quoteType)
    );
    done();
  });

  describe('Category Type Resolvers', () => {
    beforeAll(async (done) => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      await knex.seed.run();
      done();
    });

    test('should return works information from resolver function', async (done) => {
      const parentId = { id: 1 };
      const args = null;
      const fields = categoryType.getFields();
      const result = await fields.works.resolve(parentId, args);
      expect(result).toEqual([
        {
          id: 1,
          title: 'The Holy Scriptures',
          author_id: 1,
          date: '1st Century',
        },
      ]);
      done();
    });

    test('should return quote information from resolver function', async (done) => {
      const parentId = { id: 1 };
      const args = null;
      const fields = categoryType.getFields();
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
