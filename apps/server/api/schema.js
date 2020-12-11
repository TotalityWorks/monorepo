const { GraphQLSchema } = require('graphql');
const query = require('./rootQuery.js');

const schema = new GraphQLSchema({
  query,
});

module.exports = schema;
