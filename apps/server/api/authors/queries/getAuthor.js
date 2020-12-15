const { GraphQLID, GraphQLString } = require('graphql');
const { authorType } = require('../../types.js');
const Author = require('../authorsModel.js');

module.exports = {
  type: authorType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    century: { type: GraphQLString },
    location: { type: GraphQLString },
  },
  resolve(parent, args) {
    return Author.findById(args.id);
  },
};
