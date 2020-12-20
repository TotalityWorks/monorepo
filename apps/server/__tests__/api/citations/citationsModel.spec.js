const knex = require('../../../data/dbConfig.js');
const Citations = require('../../../api/citations/citationsModel.js');

describe('Citations Database Operations', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    done();
  });

  test('should return a single citation: by ID', async (done) => {
    const id = 1;
    const result = await Citations.findById(id);
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

  test('should return a single citation: by quote ID', async (done) => {
    const id = 1;
    const result = await Citations.findByQuoteId(id);
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

  test('should return aa single citation: by work ID', async (done) => {
    const id = 1;
    const result = await Citations.findByWorkId(id);
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

  afterAll(async (done) => {
    await knex.migrate.rollback();
    await knex.destroy();
    done();
  });
});
