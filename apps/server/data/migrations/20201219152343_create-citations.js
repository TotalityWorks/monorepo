/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('citations', (tbl) => {
    tbl.increments();
    tbl.string('publisher').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('citations');
};
