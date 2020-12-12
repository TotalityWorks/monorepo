/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('authors', (tbl) => {
    tbl.increments();
    tbl.string('name', 30).notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('authors');
};
