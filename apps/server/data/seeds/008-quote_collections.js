/* eslint-disable func-names */
exports.seed = function (knex) {
  return knex('quote_collections').del()
    .then(() => knex('quote_collections').insert([
      { quote_id: '1', collection_id: '1' },
    ]));
};
