const graphql = require('graphql');
const { categoryType } = require('../../api/types.js');

describe('Category GraphQL Type', () => {
  test('should verify that the fields are correct', async (done) => {
    const fields = categoryType.getFields();
    const name = '"Category"';
    expect(JSON.stringify(categoryType)).toEqual(name);
    expect(fields).toHaveProperty('id');
    expect(fields.id.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLID));
    expect(fields).toHaveProperty('name');
    expect(fields.name.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLString));
    expect(fields).toHaveProperty('description');
    expect(fields.description.type).toMatchObject(graphql.GraphQLString);
    done();
  });
});
