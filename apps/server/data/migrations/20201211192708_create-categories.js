/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('categories', (tbl) => {
    tbl.increments();
    tbl.string('name', 30).notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('categories');
};
