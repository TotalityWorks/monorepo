const db = require('../../data/dbConfig.js');

function findAll() {
  return db('collections');
}

function findById(id) {
  return db('collections').where({ id }).first();
}

async function findByUserId(userId) {
  const collections = await db('collections')
    .leftOuterJoin('users', 'collections.id', 'users.id')
    .select([
      'collections.id',
      'collections.name',
      'collections.user_id',
    ])
    .where({ 'users.id': userId })
    .groupBy('collections.id')
    .orderBy('collections.id', 'asc');
  return collections;
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
  findByUserId,
  add,
  update,
  remove,
};
