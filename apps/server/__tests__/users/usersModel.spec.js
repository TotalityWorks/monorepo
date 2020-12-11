const User = require('../../api/users/usersModel.js');
const knex = require('../../data/dbConfig.js');

describe('Database Operations', () => {
  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    done();
  });

  describe('GET functions', () => {
    test('should retrieve all users', async (done) => {
      const result = await User.findAll();
      expect(result).toEqual([{ id: 1, username: 'mosesintech' }]);
      done();
    });

    test('should retrieve a single user: by ID', async (done) => {
      const id = 1;
      const result = await User.findById(id);
      expect(result).toEqual({ id: 1, username: 'mosesintech' });
      done();
    });

    test('should retrieve a single user: by Username', async (done) => {
      const username = 'mosesintech';
      const result = await User.findByUsername(username);
      expect(result).toEqual({ id: 1, username: 'mosesintech' });
      done();
    });
  });

  describe('POST functions', () => {
    test('should add a single user', async (done) => {
      const user = {
        username: 'moosh',
      };
      const result = await User.add(user);
      expect(result).toEqual({ id: 2, username: 'moosh' });
      done();
    });
  });

  describe('PUT functions', () => {
    test('should update a single user: Username', async (done) => {
      const user = {
        id: 1,
        username: 'moses',
      };
      const { id } = user;
      const result = await User.update(id, user);
      expect(result).not.toEqual({ id: 1, username: 'mosesintech' });
      expect(result).toEqual({ id: 1, username: 'moses' });
      done();
    });
  });

  describe('DELETE functions', () => {
    test('should delete a single user by ID', async (done) => {
      const id = 1;
      const result = await User.remove(id);
      expect(result).toEqual(1);
      done();
    });

    test('should return error: user not found', async (done) => {
      const id = 1000;
      const result = await User.remove(id);
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
