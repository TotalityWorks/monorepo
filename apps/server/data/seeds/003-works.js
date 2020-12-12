/* eslint-disable func-names */
exports.seed = function (knex) {
  return knex('works').del()
    .then(() => knex('works').insert([
      { title: 'The Holy Scriptures', author_id: '1' },
    ]));
};
