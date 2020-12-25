/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('citations', (tbl) => {
    tbl.increments();
    tbl.string('publisher').notNullable();
    tbl.string('city');
    tbl.string('publication_year');
    tbl.string('pages_start');
    tbl.string('pages_end');
    tbl.string('pg_pl');
    tbl
      .integer('work_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('works')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('quote_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('quotes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('citations');
};
