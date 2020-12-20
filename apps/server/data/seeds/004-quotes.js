/* eslint-disable func-names */
exports.seed = function (knex) {
  return knex('quotes').del()
    .then(() => knex('quotes').insert([
      {
        text: 'For God so loved the world, that He gave His only begotten Son, that whosoever believeth in Him should not perish, but have everlasting life.',
        author_id: '1',
        work_id: '1',
      },
    ]));
};
