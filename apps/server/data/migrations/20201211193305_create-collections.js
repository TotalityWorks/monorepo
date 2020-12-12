/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('collections', (tbl) => {
    tbl.increments();
    tbl.string('name', 3000).notNullable().unique();
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('collections');
};
