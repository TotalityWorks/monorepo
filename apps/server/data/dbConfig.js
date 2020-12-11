const knex = require('knex');
const knexfile = require('../knexfile.js');

const env = process.env.NODE_ENV;

module.exports = knex(knexfile[env]);
