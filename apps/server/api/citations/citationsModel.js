const db = require('../../data/dbConfig.js');

function findById(id) {
  return db('citations').where({ id }).first();
}

async function findByQuoteId(id) {
  const citation = await db('quotes')
    .leftOuterJoin('citations', 'citations.quote_id', 'quotes.id')
    .select([
      'citations.id',
      'citations.publisher',
      'citations.publication_year',
      'citations.city',
      'citations.pages_start',
      'citations.pages_end',
      'citations.pg_pl',
      'citations.work_id',
      'citations.quote_id',
    ])
    .groupBy('citations.id')
    .where({ 'quotes.id': id })
    .first();
  return citation;
}

async function findByWorkId(id) {
  const citation = await db('works')
    .leftOuterJoin('citations', 'citations.work_id', 'works.id')
    .select([
      'citations.id',
      'citations.publisher',
      'citations.publication_year',
      'citations.city',
      'citations.pages_start',
      'citations.pages_end',
      'citations.pg_pl',
      'citations.work_id',
      'citations.quote_id',
    ])
    .groupBy('citations.id')
    .where({ 'works.id': id })
    .first();
  return citation;
}

module.exports = {
  findById,
  findByQuoteId,
  findByWorkId,
};
