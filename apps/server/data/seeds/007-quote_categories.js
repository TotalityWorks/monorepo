/* eslint-disable func-names */
exports.seed = function (knex) {
  return knex('quote_categories')
    .del()
    .then(() =>
      knex('quote_categories').insert([{ quote_id: '1', category_id: '1' }])
    );
};
