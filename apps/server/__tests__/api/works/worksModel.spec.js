const Works = require('../../../api/works/worksModel.js');
const knex = require('../../../data/dbConfig.js');

describe('works Database Operations', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    done();
  });

  describe('GET functions', () => {
    test('Should retrieve all works', async (done) => {
      const result = await Works.findAll();
      expect(result).toEqual([
        {
          id: 1,
          title: 'The Holy Scriptures',
          author_id: 1,
          date: '1st Century',
          categories: [1],
        },
      ]);
      done();
    });

    test('Should retrieve a single work: by ID', async (done) => {
      const id = 1;
      const result = await Works.findById(id);
      expect(result).toEqual({
        id: 1,
        title: 'The Holy Scriptures',
        author_id: 1,
        date: '1st Century',
        categories: [1],
      });
      done();
    });

    test('Should retrieve a single work: by Title', async (done) => {
      const title = 'The Holy Scriptures';
      const result = await Works.findByTitle(title);
      expect(result).toEqual({
        id: 1,
        title: 'The Holy Scriptures',
        author_id: 1,
        date: '1st Century',
        categories: [1],
      });
      done();
    });

    test('Should retrieve an array of works: by Date', async (done) => {
      const date = '1st Century';
      const result = await Works.findByDate(date);
      expect(result).toEqual([
        {
          id: 1,
          title: 'The Holy Scriptures',
          author_id: 1,
          date: '1st Century',
          categories: [1],
        },
      ]);
      done();
    });

    test('Should retrieve a single work: by Quote ID', async (done) => {
      const id = 1;
      const result = await Works.findByQuoteId(id);
      expect(result).toEqual({
        id: 1,
        title: 'The Holy Scriptures',
        author_id: 1,
        date: '1st Century',
        categories: [1],
      });
      done();
    });
  });

  describe('POST functions', () => {
    test('Should add a single work: with one category', async (done) => {
      const work = {
        title: 'The New Testament',
        author_id: 1,
        categories: [1],
      };
      const result = await Works.add(work);
      expect(result).toEqual({
        id: 2,
        title: 'The New Testament',
        author_id: 1,
        date: null,
        categories: [1],
      });
      done();
    });

    test('Should add a single work: with no category', async (done) => {
      const work = {
        title: 'The Gospels',
        author_id: 1,
        categories: [],
      };
      const result = await Works.add(work);
      expect(result).toEqual({
        id: 3,
        title: 'The Gospels',
        author_id: 1,
        date: null,
        categories: [null],
      });
      done();
    });

    test('Should find all works: by author ID', async (done) => {
      const id = 1;
      const result = await Works.findByAuthorId(id);
      expect(result).toEqual([
        {
          id: 1,
          title: 'The Holy Scriptures',
          author_id: 1,
          date: '1st Century',
        },
        {
          id: 2,
          title: 'The New Testament',
          author_id: 1,
          date: null,
        },
        {
          id: 3,
          title: 'The Gospels',
          author_id: 1,
          date: null,
        },
      ]);
      done();
    });

    test('Should find all works: by category ID', async (done) => {
      const id = 1;
      const result = await Works.findByCategoryId(id);
      expect(result).toEqual([
        {
          id: 1,
          title: 'The Holy Scriptures',
          author_id: 1,
          date: '1st Century',
        },
        {
          id: 2,
          title: 'The New Testament',
          author_id: 1,
          date: null,
        },
      ]);
      done();
    });

    test('Should retrieve all works: after adding new work', async (done) => {
      const result = await Works.findAll();
      expect(result).toEqual([
        {
          id: 1,
          title: 'The Holy Scriptures',
          author_id: 1,
          date: '1st Century',
          categories: [1],
        },
        {
          id: 2,
          title: 'The New Testament',
          author_id: 1,
          date: null,
          categories: [1],
        },
        {
          id: 3,
          title: 'The Gospels',
          author_id: 1,
          date: null,
          categories: [null],
        },
      ]);
      done();
    });
  });

  describe('PUT functions', () => {
    test('Should update a single work: Work Name', async (done) => {
      const work = {
        id: 2,
        title: 'The Old Testament',
        author_id: 1,
      };
      const { id } = work;
      const result = await Works.update(id, work);
      expect(result).not.toEqual({
        id: 2,
        title: 'The New Testament',
        author_id: 1,
        date: null,
        categories: [1],
      });
      expect(result).toEqual({
        id: 2,
        title: 'The Old Testament',
        author_id: 1,
        date: null,
        categories: [1],
      });
      done();
    });
  });

  describe('DELETE functions', () => {
    test('Should delete a single work', async (done) => {
      const id = 2;
      const result = await Works.remove(id);
      expect(result).toEqual(1);
      done();
    });

    test('Should return an error: work not found', async (done) => {
      const id = 1000;
      const result = await Works.remove(id);
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
