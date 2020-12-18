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
    if (args === null) {
      return Work.findAll();
    }
    if (!args.author_id) {
      return Work.findByDate(args.date);
    }
    return Work.findByAuthorId(args.author_id);
  },
};
