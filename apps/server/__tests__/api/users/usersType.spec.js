const graphql = require('graphql');
const knex = require('../../../data/dbConfig.js');
const { userType, collectionType } = require('../../../api/types.js');

describe('User GraphQL Type', () => {
  test('should verify that the fields are correct', async (done) => {
    const fields = userType.getFields();
    const name = '"User"';
    expect(JSON.stringify(userType)).toEqual(name);
    expect(fields).toHaveProperty('id');
    expect(fields.id.type).toMatchObject(
      new graphql.GraphQLNonNull(graphql.GraphQLID)
    );
    expect(fields).toHaveProperty('username');
    expect(fields.username.type).toMatchObject(
      new graphql.GraphQLNonNull(graphql.GraphQLString)
    );
    expect(fields).toHaveProperty('email');
    expect(fields.email.type).toMatchObject(
      new graphql.GraphQLNonNull(graphql.GraphQLString)
    );
    expect(fields).toHaveProperty('password');
    expect(fields.password.type).toMatchObject(
      new graphql.GraphQLNonNull(graphql.GraphQLString)
    );
    expect(fields).toHaveProperty('is_admin');
    expect(fields.is_admin.type).toMatchObject(
      new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
    );
    expect(fields).toHaveProperty('collections');
    expect(fields.collections.type).toMatchObject(
      new graphql.GraphQLList(collectionType)
    );
    done();
  });

  describe('User Type Resolvers', () => {
    beforeAll(async (done) => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      await knex.seed.run();
      done();
    });

    test('should return author information from resolver function', async (done) => {
      const parentId = { id: 1 };
      const args = null;
      const fields = userType.getFields();
      const result = await fields.collections.resolve(parentId, args);
      expect(result).toEqual([
        {
          id: 1,
          name: 'Favorite Quotes',
          description: 'My favorite quotes',
          user_id: 1,
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
