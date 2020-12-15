const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');
const Author = require('./authors/authorsModel.js');

const authorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    century: { type: GraphQLString },
    location: { type: GraphQLString },
    bio: { type: GraphQLString },
  }),
});

const categoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
  }),
});

const workType = new GraphQLObjectType({
  name: 'Work',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: authorType,
      resolve(parents) {
        return Author.findByWorkId(parents.id);
      },
    },
    date: { type: GraphQLString },
  }),
});

module.exports = {
  authorType,
  categoryType,
  workType,
};
