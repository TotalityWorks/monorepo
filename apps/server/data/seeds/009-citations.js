/* eslint-disable func-names */
exports.seed = function (knex) {
  return knex('citations').del()
    .then(() => knex('citations').insert([
      { publisher: 'THe Orthodox Church' },
    ]));
};
