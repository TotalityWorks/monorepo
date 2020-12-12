const db = require('../../data/dbConfig.js');

function findAll() {
  return db('categories');
}

function findById(id) {
  return db('categories').where({ id }).first();
}

async function add(category) {
  const [id] = await db('categories').insert(category, 'id');
  return findById(id);
}

async function update(id, changes) {
  await db('categories').where({ id }).update(changes);
  return findById(id);
}

function remove(id) {
  return db('categories').where({ id }).del();
}

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove,
};
