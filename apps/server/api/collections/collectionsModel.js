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

async function findQuotes(collectionID) {
  const collection = await db('quote_collections')
    .leftOuterJoin('quotes', 'quote_collections.quote_id', 'quotes.id')
    .select([
      'quotes.id',
      'quotes.text',
      'quotes.citation',
      'quotes.author_id',
      'quotes.work_id',
    ])
    .where({ 'quote_collections.collection_id': collectionID });
  return collection;
}

function findByUserId(userId) {
  return db('collections').where({ 'collections.user_id': userId });
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
  findQuotes,
  add,
  update,
  remove,
};
