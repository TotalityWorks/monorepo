/* eslint-disable func-names */
exports.seed = function (knex) {
  return knex('authors').del()
    .then(() => knex('authors').insert([
      { name: '+ICXC' },
    ]));
};
