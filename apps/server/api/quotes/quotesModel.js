const db = require('../../data/dbConfig.js');

function findAll() {
  return db('quotes');
}

function findById(id) {
  return db('quotes').where({ id }).first();
}

async function add(quote) {
  const [id] = await db('quotes').insert(quote, 'id');
  return findById(id);
}

async function update(id, changes) {
  await db('quotes').where({ id }).update(changes);
  return findById(id);
}

function remove(id) {
  return db('quotes').where({ id }).del();
}

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove,
};
