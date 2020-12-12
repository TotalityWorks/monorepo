/* eslint-disable func-names */
exports.seed = function (knex) {
  return knex('categories').del()
    .then(() => knex('categories').insert([
      { name: 'Theology' },
    ]));
};
