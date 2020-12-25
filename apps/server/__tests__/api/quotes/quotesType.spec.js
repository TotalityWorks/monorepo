const graphql = require('graphql');
const knex = require('../../../data/dbConfig.js');
const {
  quoteType,
  authorType,
  workType,
  citationType,
  categoryType,
} = require('../../../api/types.js');

describe('Quote GraphQL Type', () => {
  test('should verify that the fields are correct', async (done) => {
    const fields = quoteType.getFields();
    const name = '"Quote"';
    expect(JSON.stringify(quoteType)).toEqual(name);
    expect(fields).toHaveProperty('id');
    expect(fields.id.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLID));
    expect(fields).toHaveProperty('text');
    expect(fields.text.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLString));
    expect(fields).toHaveProperty('author');
    expect(fields.author.type).toMatchObject(authorType);
    expect(fields).toHaveProperty('work');
    expect(fields.work.type).toMatchObject(workType);
    expect(fields).toHaveProperty('citation');
    expect(fields.citation.type).toMatchObject(citationType);
    expect(fields).toHaveProperty('categories');
    expect(fields.categories.type).toMatchObject(categoryType);
    done();
  });

  describe('Quote Type Resolvers', () => {
    beforeAll(async (done) => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      await knex.seed.run();
      done();
    });

    test('should return author information from resolver function', async (done) => {
      const parentId = { id: 1 };
      const args = null;
      const fields = quoteType.getFields();
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

    test('should return citation information from resolver function', async (done) => {
      const parentId = { id: 1 };
      const args = null;
      const fields = quoteType.getFields();
      const result = await fields.citation.resolve(parentId, args);
      expect(result).toEqual({
        id: 1,
        publisher: 'The Orthodox Church',
        city: 'Dallas',
        publication_year: '2020',
        pages_start: '1',
        pages_end: '5',
        pg_pl: null,
        work_id: 1,
        quote_id: 1,
      });
      done();
    });

    test('should return work information from resolver function', async (done) => {
      const parentId = { id: 1 };
      const args = null;
      const fields = quoteType.getFields();
      const result = await fields.work.resolve(parentId, args);
      expect(result).toEqual({
        id: 1,
        title: 'The Holy Scriptures',
        author_id: 1,
        date: '1st Century',
        categories: [
          1,
        ],
      });
      done();
    });

    test('should return an array of categories from resolver function', async (done) => {
      const parentId = { id: 1 };
      const args = null;
      const fields = quoteType.getFields();
      const result = await fields.categories.resolve(parentId, args);
      expect(result).toEqual([{
        id: 1,
        name: 'Theology',
        description: 'The study of God',
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
