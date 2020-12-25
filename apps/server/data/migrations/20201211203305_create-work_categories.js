/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('work_categories', (tbl) => {
    tbl.increments();
    tbl
      .integer('work_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('works')
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
  return knex.schema.dropTableIfExists('work_categories');
};
