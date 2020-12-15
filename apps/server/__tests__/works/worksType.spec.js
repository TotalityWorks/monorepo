const graphql = require('graphql');
const knex = require('../../data/dbConfig.js');
const { workType, authorType } = require('../../api/types.js');

describe('Work GraphQL Type', () => {
  test('should verify that the fields are correct', async (done) => {
    const fields = workType.getFields();
    const name = '"Work"';
    expect(JSON.stringify(workType)).toEqual(name);
    expect(fields).toHaveProperty('id');
    expect(fields.id.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLID));
    expect(fields).toHaveProperty('title');
    expect(fields.title.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLString));
    expect(fields).toHaveProperty('date');
    expect(fields.date.type).toMatchObject(graphql.GraphQLString);
    expect(fields).toHaveProperty('author');
    expect(fields.author.type).toMatchObject(authorType);
    done();
  });

  test('should return author information from resolver function', async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();

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
    await knex.migrate.rollback();
    await knex.destroy();
    done();
  });
});
