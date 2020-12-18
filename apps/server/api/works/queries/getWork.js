const { GraphQLID, GraphQLString } = require('graphql');
const { workType } = require('../../types.js');
const Work = require('../worksModel.js');

module.exports = {
  type: workType,
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    date: { type: GraphQLString },
  },
  resolve(parent, args) {
    if (!args.title) {
      return Work.findById(args.id);
    }
    return Work.findByTitle(args.title);
  },
};
