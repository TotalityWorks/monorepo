/* eslint-disable func-names */
exports.seed = function (knex) {
  return knex('collections').del()
    .then(() => knex('collections').insert([
      {
        name: 'Favorite Quotes',
        description: 'My favorite quotes',
        user_id: '1',
      },
    ]));
};
