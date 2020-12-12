/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('works', (tbl) => {
    tbl.increments();
    tbl.string('title', 30).notNullable().unique();
    tbl.integer('author_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('authors')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('works');
};
