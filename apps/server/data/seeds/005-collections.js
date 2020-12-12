/* eslint-disable func-names */
exports.seed = function (knex) {
  return knex('collections').del()
    .then(() => knex('collections').insert([
      { name: 'Favorite Quotes', user_id: '1' },
    ]));
};
