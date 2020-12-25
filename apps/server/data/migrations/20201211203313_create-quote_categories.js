/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('quote_categories', (tbl) => {
    tbl.increments();
    tbl
      .integer('quote_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('quotes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('category_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('categories')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('quote_categories');
};
