const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');
const Author = require('./authors/authorsModel.js');
const Work = require('./works/worksModel.js');

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

const quoteType = new GraphQLObjectType({
  name: 'Quote',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) },
    citation: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: authorType,
      resolve(parent) {
        return Author.findByQuoteId(parent.id);
      },
    },
    work: {
      type: workType,
      resolve(parent) {
        return Work.findByQuoteId(parent.id);
      },
    },
  }),
});

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    is_admin: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});

module.exports = {
  authorType,
  categoryType,
  workType,
  quoteType,
  userType,
};
