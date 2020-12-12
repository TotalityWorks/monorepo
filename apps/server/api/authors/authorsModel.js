const db = require('../../data/dbConfig.js');

function findAll() {
  return db('authors');
}

function findById(id) {
  return db('authors').where({ id }).first();
}

async function add(author) {
  const [id] = await db('authors').insert(author, 'id');
  return findById(id);
}

async function update(id, changes) {
  await db('authors').where({ id }).update(changes);
  return findById(id);
}

function remove(id) {
  return db('authors').where({ id }).del();
}

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove,
};
