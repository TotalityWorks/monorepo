const Quotes = require('../../api/quotes/quotesModel.js');
const knex = require('../../data/dbConfig.js');

describe('Quotes Database Operations', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    done();
  });

  describe('GET functions', () => {
    test('Should retrieve all quotes', async (done) => {
      const result = await Quotes.findAll();
      expect(result).toEqual([{
        id: 1,
        text: 'For God so loved the world, that He gave His only begotten Son, that whosoever believeth in Him should not perish, but have everlasting life.',
        author_id: 1,
        work_id: 1,
        citation: 'John 3:16',
        categories: [
          1,
        ],
      }]);
      done();
    });

    test('Should retrieve a single quote: by ID', async (done) => {
      const id = 1;
      const result = await Quotes.findById(id);
      expect(result).toEqual({
        id: 1,
        text: 'For God so loved the world, that He gave His only begotten Son, that whosoever believeth in Him should not perish, but have everlasting life.',
        author_id: 1,
        work_id: 1,
        citation: 'John 3:16',
        categories: [
          1,
        ],
      });
      done();
    });
  });

  describe('POST functions', () => {
    test('Should add a single quote', async (done) => {
      const quote = {
        text: 'For all have sinned, and come short of the glory of God;',
        author_id: 1,
        work_id: 1,
        citation: 'Romans 3:23',
        categories: [
          1,
        ],
      };
      const result = await Quotes.add(quote);
      expect(result).toEqual({
        id: 2,
        text: 'For all have sinned, and come short of the glory of God;',
        author_id: 1,
        work_id: 1,
        citation: 'Romans 3:23',
        categories: [
          1,
        ],
      });
      done();
    });

    test('Should add a single quote: with no category', async (done) => {
      const quote = {
        text: 'Lord Jesus Christ, Son of God, have mercy on me.',
        author_id: 1,
        work_id: 1,
        citation: null,
        categories: [],
      };
      const result = await Quotes.add(quote);
      expect(result).toEqual({
        id: 3,
        text: 'Lord Jesus Christ, Son of God, have mercy on me.',
        author_id: 1,
        work_id: 1,
        citation: null,
        categories: [
          null,
        ],
      });
      done();
    });

    test('Should retrieve all quotes: after adding new quote', async (done) => {
      const result = await Quotes.findAll();
      expect(result).toEqual([{
        id: 1,
        text: 'For God so loved the world, that He gave His only begotten Son, that whosoever believeth in Him should not perish, but have everlasting life.',
        author_id: 1,
        work_id: 1,
        citation: 'John 3:16',
        categories: [
          1,
        ],
      },
      {
        id: 2,
        text: 'For all have sinned, and come short of the glory of God;',
        author_id: 1,
        work_id: 1,
        citation: 'Romans 3:23',
        categories: [
          1,
        ],
      },
      {
        id: 3,
        text: 'Lord Jesus Christ, Son of God, have mercy on me.',
        author_id: 1,
        work_id: 1,
        citation: null,
        categories: [
          null,
        ],
      }]);
      done();
    });
  });

  describe('PUT functions', () => {
    test('Should update a single quote: Quote Text', async (done) => {
      const quote = {
        id: 2,
        text: 'Blessed is the man to whom the Lord will not impute sin.',
        citation: 'Romans 4:8',
      };
      const { id } = quote;
      const result = await Quotes.update(id, quote);
      expect(result).not.toEqual({
        id: 2,
        text: 'For all have sinned, and come short of the glory of God;',
        author_id: 1,
        work_id: 1,
        citation: 'Romans 3:23',
        categories: [
          1,
        ],
      });
      expect(result).toEqual({
        id: 2,
        text: 'Blessed is the man to whom the Lord will not impute sin.',
        author_id: 1,
        work_id: 1,
        citation: 'Romans 4:8',
        categories: [
          1,
        ],
      });
      done();
    });
  });

  describe('DELETE functions', () => {
    test('Should delete a single quote', async (done) => {
      const id = 2;
      const result = await Quotes.remove(id);
      expect(result).toEqual(1);
      done();
    });

    test('Should return an error: quote not found', async (done) => {
      const id = 1000;
      const result = await Quotes.remove(id);
      expect(result).toEqual(0);
      done();
    });
  });

  afterAll(async (done) => {
    await knex.migrate.rollback();
    await knex.destroy();
    done();
  });
});
