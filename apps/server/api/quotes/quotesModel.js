const db = require('../../data/dbConfig.js');

async function findAll() {
  const quotes = await db('quotes')
    .leftOuterJoin('quote_categories', 'quotes.id', 'quote_categories.quote_id')
    .select([
      'quotes.id',
      'quotes.text',
      'quotes.author_id',
      'quotes.work_id',
      'quotes.citation',
      db.raw('ARRAY_AGG(quote_categories.category_id) as categories'),
    ])
    .groupBy('quotes.id')
    .orderBy('quotes.id', 'asc');
  return quotes;
}

async function findById(id) {
  const quotes = await db('quotes')
    .leftOuterJoin('quote_categories', 'quotes.id', 'quote_categories.quote_id')
    .select([
      'quotes.id',
      'quotes.text',
      'quotes.author_id',
      'quotes.work_id',
      'quotes.citation',
      db.raw('ARRAY_AGG(quote_categories.category_id) as categories'),
    ])
    .groupBy('quotes.id', 'quotes.text')
    .where({ 'quotes.id': id })
    .first();
  return quotes;
}

async function findByWorkId(id) {
  const quotes = await db('quotes').where({ work_id: id });
  return quotes;
}

async function findByAuthorId(id) {
  const quotes = await db('quotes').where({ author_id: id });
  return quotes;
}

async function findByCategoryId(id) {
  const quotes = await db('quotes')
    .leftOuterJoin('quote_categories', 'quotes.id', 'quote_categories.quote_id')
    .select([
      'quotes.id',
      'quotes.text',
      'quotes.citation',
      'quotes.author_id',
      'quotes.work_id',
    ])
    .groupBy('quotes.id')
    .where({ 'quote_categories.category_id': id });
  return quotes;
}

async function add(quote) {
  const newQuote = {
    text: quote.text,
    author_id: quote.author_id,
    work_id: quote.work_id,
    citation: quote.citation,
  };
  const [id] = await db('quotes').insert(newQuote, 'id');

  if (quote.categories.length > 0) {
    const { categories } = quote;
    categories.forEach(async (cat) => {
      const quoteCategories = {
        quote_id: id,
        category_id: cat,
      };
      await db('quote_categories').insert(quoteCategories);
    });
  }

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
  findByWorkId,
  findByAuthorId,
  findByCategoryId,
  add,
  update,
  remove,
};
