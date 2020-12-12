const db = require('../../data/dbConfig.js');

function findAll() {
  return db('collections');
}

function findById(id) {
  return db('collections').where({ id }).first();
}

async function add(collection) {
  const [id] = await db('collections').insert(collection, 'id');
  return findById(id);
}

async function update(id, changes) {
  await db('collections').where({ id }).update(changes);
  return findById(id);
}

function remove(id) {
  return db('collections').where({ id }).del();
}

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove,
};
