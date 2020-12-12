const db = require('../../data/dbConfig.js');
const { hash } = require('../auth/bcrypt.js');

function findAll() {
  return db('users');
}

function findById(id) {
  return db('users').where({ id }).first();
}

function findByUsername(username) {
  return db('users').where({ username }).first();
}

async function add(user) {
  const hashedUser = await hash(user);
  const [id] = await db('users').insert(hashedUser, 'id');
  return findById(id);
}

async function update(id, user) {
  const { password } = user;
  if (!password) {
    await db('users').where({ id }).update(user);
    return findById(id);
  }
  const hashedUser = await hash(user);
  await db('users').where({ id }).update(hashedUser);
  return findById(id);
}

function remove(id) {
  return db('users').where({ id }).del();
}

module.exports = {
  findAll,
  findById,
  findByUsername,
  add,
  update,
  remove,
};
