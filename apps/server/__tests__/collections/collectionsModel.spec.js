const Collections = require('../../api/collections/collectionsModel.js');
const knex = require('../../data/dbConfig.js');

describe('collections Database Operations', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    done();
  });

  describe('GET functions', () => {
    test('Should retrieve all collections', async (done) => {
      const result = await Collections.findAll();
      expect(result).toEqual([{
        id: 1,
        name: 'Favorite Quotes',
        user_id: 1,
      }]);
      done();
    });

    test('Should retrieve a single collection: by ID', async (done) => {
      const id = 1;
      const result = await Collections.findById(id);
      expect(result).toEqual({
        id: 1,
        name: 'Favorite Quotes',
        user_id: 1,
      });
      done();
    });
  });

  describe('POST functions', () => {
    test('Should add a single collection', async (done) => {
      const collection = {
        name: 'Cool Quotes',
        user_id: 1,
      };
      const result = await Collections.add(collection);
      expect(result).toEqual({
        id: 2,
        name: 'Cool Quotes',
        user_id: 1,
      });
      done();
    });
  });

  describe('PUT functions', () => {
    test('Should update a single collection: Collection Name', async (done) => {
      const collection = {
        id: 2,
        name: 'Odd Quotes',
        user_id: 1,
      };
      const { id } = collection;
      const result = await Collections.update(id, collection);
      expect(result).not.toEqual({
        id: 2,
        name: 'Cool Quotes',
        user_id: 1,
      });
      expect(result).toEqual({
        id: 2,
        name: 'Odd Quotes',
        user_id: 1,
      });
      done();
    });
  });

  describe('DELETE functions', () => {
    test('Should delete a single collection', async (done) => {
      const id = 2;
      const result = await Collections.remove(id);
      expect(result).toEqual(1);
      done();
    });

    test('Should return an error: collection not found', async (done) => {
      const id = 1000;
      const result = await Collections.remove(id);
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