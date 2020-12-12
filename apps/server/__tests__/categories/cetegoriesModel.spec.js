const Categories = require('../../api/categories/categoriesModel.js');
const knex = require('../../data/dbConfig.js');

describe('Categories Database Operations', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    done();
  });

  describe('GET functions', () => {
    test('Should retrieve all categories', async (done) => {
      const result = await Categories.findAll();
      expect(result).toEqual([{
        id: 1,
        name: 'Theology',
      }]);
      done();
    });

    test('Should retrieve a single category: by ID', async (done) => {
      const id = 1;
      const result = await Categories.findById(id);
      expect(result).toEqual({
        id: 1,
        name: 'Theology',
      });
      done();
    });
  });

  describe('POST functions', () => {
    test('Should add a single category', async (done) => {
      const category = {
        name: 'Prayer',
      };
      const result = await Categories.add(category);
      expect(result).toEqual({
        id: 2,
        name: 'Prayer',
      });
      done();
    });
  });

  describe('PUT functions', () => {
    test('Should update a single category: Category Name', async (done) => {
      const category = {
        id: 2,
        name: 'Fasting',
      };
      const { id } = category;
      const result = await Categories.update(id, category);
      expect(result).not.toEqual({
        id: 2,
        name: 'Prayer',
      });
      expect(result).toEqual({
        id: 2,
        name: 'Fasting',
      });
      done();
    });
  });

  describe('DELETE functions', () => {
    test('Should delete a single category', async (done) => {
      const id = 2;
      const result = await Categories.remove(id);
      expect(result).toEqual(1);
      done();
    });

    test('Should return an error: category not found', async (done) => {
      const id = 1000;
      const result = await Categories.remove(id);
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