/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('authors', (tbl) => {
    tbl.increments();
    tbl.string('name', 30).notNullable().unique();
    tbl.string('century');
    tbl.string('location');
    tbl.string('bio');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('authors');
};
