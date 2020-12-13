const graphql = require('graphql');
const { authorType } = require('../../api/types.js');

describe('Author GraphQL Type', () => {
  test('should verify that the fields are correct', async (done) => {
    const fields = authorType.getFields();
    const name = '"Author"';
    expect(JSON.stringify(authorType)).toEqual(name);
    expect(fields).toHaveProperty('id');
    expect(fields.id.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLID));
    expect(fields).toHaveProperty('name');
    expect(fields.name.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLString));
    expect(fields).toHaveProperty('century');
    expect(fields.century.type).toMatchObject(graphql.GraphQLString);
    expect(fields).toHaveProperty('location');
    expect(fields.location.type).toMatchObject(graphql.GraphQLString);
    expect(fields).toHaveProperty('bio');
    expect(fields.bio.type).toMatchObject(graphql.GraphQLString);
    done();
  });
});
