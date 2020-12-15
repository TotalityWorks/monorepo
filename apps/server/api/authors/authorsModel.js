const db = require('../../data/dbConfig.js');

function findAll() {
  return db('authors');
}

function findBy(param) {
  return db('authors').where(param);
}

function findById(id) {
  return db('authors').where({ id }).first();
}

async function findByWorkId(id) {
  const work = await db('works').where({ id }).first();
  const authorID = work.author_id;
  const author = await db('authors').where({ id: authorID }).first();
  return author;
}

async function findByQuoteId(id) {
  const work = await db('quotes').where({ id }).first();
  const authorID = work.author_id;
  const author = await findById(authorID);
  return author;
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
  findBy,
  findById,
  findByWorkId,
  findByQuoteId,
  add,
  update,
  remove,
};
