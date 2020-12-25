/* eslint-disable func-names */
exports.seed = function (knex) {
  return knex('citations')
    .del()
    .then(() =>
      knex('citations').insert([
        {
          publisher: 'The Orthodox Church',
          city: 'Dallas',
          publication_year: '2020',
          pages_start: '1',
          pages_end: '5',
          pg_pl: null,
          work_id: 1,
          quote_id: 1,
        },
      ])
    );
};
