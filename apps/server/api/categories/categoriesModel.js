const db = require('../../data/dbConfig.js');

function findAll() {
  return db('categories');
}

function findById(id) {
  return db('categories').where({ id }).first();
}

async function findByQuoteId(id) {
  const categories = await db('categories')
    .leftOuterJoin('quote_categories', 'categories.id', 'quote_categories.category_id')
    .select([
      'categories.id',
      'categories.name',
      'categories.description',
    ])
    .groupBy('categories.id')
    .where({ 'quote_categories.quote_id': id });
  return categories;
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
  findByQuoteId,
  add,
  update,
  remove,
};
