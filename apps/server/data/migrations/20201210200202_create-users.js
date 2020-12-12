/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments();
    tbl.string('username').notNullable().unique();
    tbl.string('email').notNullable().unique();
    tbl.string('password').notNullable();
    tbl.boolean('is_admin').notNullable().defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
