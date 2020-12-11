/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('quotes', (tbl) => {
    tbl.increments();
    tbl.string('quote_text', 3000).notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('quotes');
};
