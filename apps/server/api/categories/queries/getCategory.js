const { GraphQLID, GraphQLString } = require('graphql');
const { categoryType } = require('../../types.js');
const Category = require('../categoriesModel.js');

module.exports = {
  type: categoryType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
  resolve(parent, args) {
    if (args.id) {
      return Category.findById(args.id);
    }
    return Category.findBy(args).first();
  },
};
