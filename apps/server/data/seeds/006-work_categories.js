/* eslint-disable func-names */
exports.seed = function (knex) {
  return knex('work_categories')
    .del()
    .then(() =>
      knex('work_categories').insert([{ work_id: '1', category_id: '1' }])
    );
};
