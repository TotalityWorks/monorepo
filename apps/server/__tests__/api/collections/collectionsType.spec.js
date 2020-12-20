const graphql = require('graphql');
const knex = require('../../../data/dbConfig.js');
const { collectionType, userType, quoteType } = require('../../../api/types.js');

describe('Collection GraphQL Type', () => {
  test('should verify that the fields are correct', async (done) => {
    const fields = collectionType.getFields();
    const name = '"Collection"';
    expect(JSON.stringify(collectionType)).toEqual(name);
    expect(fields).toHaveProperty('id');
    expect(fields.id.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLID));
    expect(fields).toHaveProperty('name');
    expect(fields.name.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLString));
    expect(fields).toHaveProperty('description');
    expect(fields.description.type).toMatchObject(graphql.GraphQLString);
    expect(fields).toHaveProperty('user');
    expect(fields.user.type).toMatchObject(userType);
    expect(fields).toHaveProperty('quotes');
    expect(fields.quotes.type).toMatchObject(new graphql.GraphQLList(quoteType));
    done();
  });

  describe('Collection Type Resolvers', () => {
    beforeAll(async (done) => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      await knex.seed.run();
      done();
    });

    test('should return user information from resolver function', async (done) => {
      const parentId = { id: 1 };
      const args = null;
      const fields = collectionType.getFields();
      const result = await fields.user.resolve(parentId, args);
      expect(result).toEqual({
        id: 1,
        username: 'mosesintech',
        email: 'moses@totalityworks.com',
        password: 'password',
        is_admin: true,
      });
      done();
    });

    test('should return quote information from resolver function', async (done) => {
      const parentId = { id: 1 };
      const args = null;
      const fields = collectionType.getFields();
      const result = await fields.quotes.resolve(parentId, args);
      expect(result).toEqual([{
        id: 1,
        text: 'For God so loved the world, that He gave His only begotten Son, that whosoever believeth in Him should not perish, but have everlasting life.',
        author_id: 1,
        work_id: 1,
      }]);
      done();
    });

    afterAll(async (done) => {
      await knex.migrate.rollback();
      await knex.destroy();
      done();
    });
  });
});
