const db = require('../../data/dbConfig.js');

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
  const [id] = await db('users').insert(user, 'id');
  return findById(id);
}

async function update(id, user) {
  await db('users').where({ id }).update(user);
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
