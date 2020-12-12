const { hash, comparePassword, salt } = require('../../api/auth/bcrypt.js');

test('Should hash user password', async () => {
  const user = {
    username: 'Jeb Bush',
    email: 'jeb@bush.com',
    password: 'pleaseclap',
  };
  const result = await hash(user);
  expect(result).toEqual({
    username: 'Jeb Bush',
    email: 'jeb@bush.com',
    password: expect.anything(),
  });
  expect(result.password).not.toEqual('pleaseclap');
});

describe('Should compare given password to hashed password', () => {
  const user = {
    username: 'George W Bush',
    email: 'george@w.com',
    password: 'pleaseclap',
  };
  const hashedUser = hash(user);

  test('Should compare wrong password to hashed password', async () => {
    const password = 'clapplease';
    const result = await comparePassword(password, hashedUser.password);
    expect(result).toEqual(false);
  });

  test('Should compare correct password to hashed password', async () => {
    const password = 'pleaseclap';
    const result = await comparePassword(password, hashedUser.password);
    expect(result).toEqual(true);
  });
});

test('Should create a hash', async (done) => {
  const key = salt();
  expect(typeof key).toBe('string');
  expect(key).toMatch('$2a$10$');
  expect(key).toContain('$2a$10$');
  done();
});
