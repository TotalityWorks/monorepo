const db = require('../../data/dbConfig.js');

async function findAll() {
  const collections = await db('collections')
    .leftOuterJoin('quote_collections', 'collections.id', 'quote_collections.collection_id')
    .select([
      'collections.id',
      'collections.name',
      'collections.description',
      'collections.user_id',
      db.raw('ARRAY_AGG(quote_collections.quote_id) as quotes'),
    ])
    .groupBy('collections.id')
    .orderBy('collections.id', 'asc');
  return collections;
}

async function findById(id) {
  const collections = await db('collections')
    .leftOuterJoin('quote_collections', 'collections.id', 'quote_collections.collection_id')
    .select([
      'collections.id',
      'collections.name',
      'collections.description',
      'collections.user_id',
      db.raw('ARRAY_AGG(quote_collections.quote_id) as quotes'),
    ])
    .groupBy('collections.id')
    .where({ 'collections.id': id })
    .orderBy('collections.id', 'asc')
    .first();
  return collections;
}

async function findByUserId(userId) {
  const collections = await db('collections')
    .leftOuterJoin('users', 'collections.user_id', 'users.id')
    .select([
      'collections.id',
      'collections.name',
      'collections.description',
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
