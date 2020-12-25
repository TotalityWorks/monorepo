/* eslint-disable func-names */
exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(() =>
      knex('users').insert([
        {
          username: 'mosesintech',
          email: 'moses@totalityworks.com',
          password: 'password',
          is_admin: true,
        },
      ])
    );
};
