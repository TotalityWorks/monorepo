const db = require('../../data/dbConfig.js');

async function findAll() {
  const works = await db('works')
    .leftOuterJoin('work_categories', 'works.id', 'work_categories.work_id')
    .select([
      'works.id',
      'works.title',
      'works.author_id',
      'works.date',
      db.raw('ARRAY_AGG(work_categories.category_id) as categories'),
    ])
    .groupBy('works.id')
    .orderBy('works.id', 'asc');
  return works;
}

async function findById(id) {
  const works = await db('works')
    .leftOuterJoin('work_categories', 'works.id', 'work_categories.work_id')
    .select([
      'works.id',
      'works.title',
      'works.author_id',
      'works.date',
      db.raw('ARRAY_AGG(work_categories.category_id) as categories'),
    ])
    .groupBy('works.id', 'works.title')
    .where({ 'works.id': id })
    .first();
  return works;
}

async function findByDate(date) {
  const works = await db('works')
    .leftOuterJoin('work_categories', 'works.id', 'work_categories.work_id')
    .select([
      'works.id',
      'works.title',
      'works.author_id',
      'works.date',
      db.raw('ARRAY_AGG(work_categories.category_id) as categories'),
    ])
    .groupBy('works.id', 'works.title')
    .where({ 'works.date': date });
  return works;
}

async function findByTitle(title) {
  const works = await db('works')
    .leftOuterJoin('work_categories', 'works.id', 'work_categories.work_id')
    .select([
      'works.id',
      'works.title',
      'works.author_id',
      'works.date',
      db.raw('ARRAY_AGG(work_categories.category_id) as categories'),
    ])
    .groupBy('works.id', 'works.title')
    .where({ 'works.title': title })
    .first();
  return works;
}

async function findByQuoteId(id) {
  const quote = await db('quotes').where({ id }).first();
  const workID = quote.work_id;
  const work = await findById(workID);
  return work;
}

async function findByAuthorId(id) {
  const works = await db('works').where({ author_id: id });
  return works;
}

async function findByCategoryId(id) {
  const works = await db('works')
    .leftOuterJoin('work_categories', 'works.id', 'work_categories.work_id')
    .select(['works.id', 'works.title', 'works.author_id', 'works.date'])
    .groupBy('works.id')
    .where({ 'work_categories.category_id': id });
  return works;
}

async function add(work) {
  const newWork = {
    title: work.title,
    author_id: work.author_id,
  };
  const [id] = await db('works').insert(newWork, 'id');

  if (work.categories.length > 0) {
    const { categories } = work;
    categories.forEach(async (cat) => {
      const workCategories = {
        work_id: id,
        category_id: cat,
      };
      await db('work_categories').insert(workCategories);
    });
  }

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
  findByDate,
  findByTitle,
  findById,
  findByQuoteId,
  findByAuthorId,
  findByCategoryId,
  add,
  update,
  remove,
};
