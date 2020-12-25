const graphql = require('graphql');
const { citationType } = require('../../../api/types.js');

describe('Citation GraphQL Type', () => {
  test('should verify that the fields are correct', async (done) => {
    const fields = citationType.getFields();
    const name = '"Citation"';
    expect(JSON.stringify(citationType)).toEqual(name);
    expect(fields).toHaveProperty('id');
    expect(fields.id.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLID));
    expect(fields).toHaveProperty('publisher');
    expect(fields.publisher.type).toMatchObject(graphql.GraphQLString);
    expect(fields).toHaveProperty('publication_year');
    expect(fields.publication_year.type).toMatchObject(graphql.GraphQLString);
    expect(fields).toHaveProperty('city');
    expect(fields.city.type).toMatchObject(graphql.GraphQLString);
    expect(fields).toHaveProperty('pages_start');
    expect(fields.pages_start.type).toMatchObject(graphql.GraphQLString);
    expect(fields).toHaveProperty('pages_end');
    expect(fields.pages_end.type).toMatchObject(graphql.GraphQLString);
    expect(fields).toHaveProperty('pg_pl');
    expect(fields.pg_pl.type).toMatchObject(graphql.GraphQLString);
    done();
  });
});
