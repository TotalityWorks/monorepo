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
      expect(result).toEqual([{ id: 1, quote_text: 'For God so loved the world, that He gave His only begotten Son, that whosoever believeth in Him should not perish, but have everlasting life.' }]);
      done();
    });

    test('Should retrieve a single quote: by ID', async (done) => {
      const id = 1;
      const result = await Quotes.findById(id);
      expect(result).toEqual({ id: 1, quote_text: 'For God so loved the world, that He gave His only begotten Son, that whosoever believeth in Him should not perish, but have everlasting life.' });
      done();
    });
  });

  describe('POST functions', () => {
    test('Should add a single quote', async (done) => {
      const quote = {
        quote_text: 'For all have sinned, and come short of the glory of God;',
      };
      const result = await Quotes.add(quote);
      expect(result).toEqual({ id: 2, quote_text: 'For all have sinned, and come short of the glory of God;' });
      done();
    });
  });

  describe('PUT functions', () => {
    test('Should update a single quote: Quote Text', async (done) => {
      const quote = {
        id: 2,
        quote_text: 'Blessed is the man to whom the Lord will not impute sin.',
      };
      const { id } = quote;
      const result = await Quotes.update(id, quote);
      expect(result).not.toEqual({ id: 2, quote_text: 'For all have sinned, and come short of the glory of God;' });
      expect(result).toEqual({ id: 2, quote_text: 'Blessed is the man to whom the Lord will not impute sin.' });
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
