/* eslint-disable func-names */
exports.seed = function (knex) {
  return knex('authors').del()
    .then(() => knex('authors').insert([
      {
        name: '+ICXC',
        century: '1st',
        location: 'Judea',
        bio: 'The Holy Adored King Jesus Christ, the only begotten Son of God.',
      },
    ]));
};
