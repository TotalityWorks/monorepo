const Authors = require('../../api/authors/authorsModel.js');
const knex = require('../../data/dbConfig.js');

describe('Authors Database Operations', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    done();
  });

  describe('GET functions', () => {
    test('Should retrieve all authors', async (done) => {
      const result = await Authors.findAll();
      expect(result).toEqual([{
        id: 1,
        name: '+ICXC',
        century: '1st',
        location: 'Judea',
        bio: 'The Holy Adored King Jesus Christ, the only begotten Son of God.',
      }]);
      done();
    });

    test('Should retrieve a single author: by ID', async (done) => {
      const id = 1;
      const result = await Authors.findById(id);
      expect(result).toEqual({
        id: 1,
        name: '+ICXC',
        century: '1st',
        location: 'Judea',
        bio: 'The Holy Adored King Jesus Christ, the only begotten Son of God.',
      });
      done();
    });
  });

  describe('POST functions', () => {
    test('Should add a single author', async (done) => {
      const author = {
        name: 'Saint Paul the Apostle',
      };
      const result = await Authors.add(author);
      expect(result).toEqual({
        id: 2,
        name: 'Saint Paul the Apostle',
        century: null,
        location: null,
        bio: null,
      });
      done();
    });
  });

  describe('PUT functions', () => {
    test('Should update a single author: Author Name', async (done) => {
      const author = {
        id: 2,
        name: 'Holy Prophet and Godseer Moses',
      };
      const { id } = author;
      const result = await Authors.update(id, author);
      expect(result).not.toEqual({
        id: 2,
        name: 'Saint Paul the Apostle',
        century: null,
        location: null,
        bio: null,
      });
      expect(result).toEqual({
        id: 2,
        name: 'Holy Prophet and Godseer Moses',
        century: null,
        location: null,
        bio: null,
      });
      done();
    });
  });

  describe('DELETE functions', () => {
    test('Should delete a single author', async (done) => {
      const id = 2;
      const result = await Authors.remove(id);
      expect(result).toEqual(1);
      done();
    });

    test('Should return an error: author not found', async (done) => {
      const id = 1000;
      const result = await Authors.remove(id);
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
