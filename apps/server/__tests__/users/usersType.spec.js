const graphql = require('graphql');
const { userType } = require('../../api/types.js');

describe('User GraphQL Type', () => {
  test('should verify that the fields are correct', async (done) => {
    const fields = userType.getFields();
    const name = '"User"';
    expect(JSON.stringify(userType)).toEqual(name);
    expect(fields).toHaveProperty('id');
    expect(fields.id.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLID));
    expect(fields).toHaveProperty('username');
    expect(fields.username.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLString));
    expect(fields).toHaveProperty('email');
    expect(fields.email.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLString));
    expect(fields).toHaveProperty('password');
    expect(fields.password.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLString));
    expect(fields).toHaveProperty('is_admin');
    expect(fields.is_admin.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLBoolean));
    done();
  });
});
