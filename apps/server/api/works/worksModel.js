const db = require('../../data/dbConfig.js');

function findAll() {
  return db('works');
}

function findById(id) {
  return db('works').where({ id }).first();
}

async function add(work) {
  const [id] = await db('works').insert(work, 'id');
  return findById(id);
}

async function update(id, changes) {
  await db('works').where({ id }).update(changes);
  return findById(id);
}

function remove(id) {
  return db('works').where({ id }).del();
}

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove,
};
