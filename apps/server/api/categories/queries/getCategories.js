const { GraphQLID, GraphQLString } = require('graphql');
const { categoryType } = require('../../types.js');
const Category = require('../categoriesModel.js');

module.exports = {
  type: categoryType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  resolve(parent, args) {
    if (!args) {
      return Category.findAll();
    }
    return Category.findBy(args);
  },
};
