/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('quotes', (tbl) => {
    tbl.increments();
    tbl.string('text', 3000).notNullable().unique();
    tbl.integer('author_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('authors')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.integer('work_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('works')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('quotes');
};
