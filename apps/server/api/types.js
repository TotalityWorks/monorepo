/* eslint-disable no-use-before-define */
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');
const Author = require('./authors/authorsModel.js');
const Work = require('./works/worksModel.js');
const Quote = require('./quotes/quotesModel.js');
const User = require('./users/usersModel.js');
const Collection = require('./collections/collectionsModel.js');

const authorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    century: { type: GraphQLString },
    location: { type: GraphQLString },
    bio: { type: GraphQLString },
    works: {
      type: new GraphQLList(workType),
      resolve(parent) {
        return Work.findByAuthorId(parent.id);
      },
    },
    quotes: {
      type: new GraphQLList(quoteType),
      resolve(parent) {
        return Quote.findByAuthorId(parent.id);
      },
    },
  }),
});

const categoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    works: {
      type: new GraphQLList(workType),
      resolve(parent) {
        return Work.findByCategoryId(parent.id);
      },
    },
    quotes: {
      type: new GraphQLList(quoteType),
      resolve(parent) {
        return Quote.findByCategoryId(parent.id);
      },
    },
  }),
});

const workType = new GraphQLObjectType({
  name: 'Work',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLString },
    author: {
      type: authorType,
      resolve(parents) {
        return Author.findByWorkId(parents.id);
      },
    },
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

const collectionType = new GraphQLObjectType({
  name: 'Collection',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    user: {
      type: userType,
      resolve(parent) {
        return User.findByCollectionId(parent.id);
      },
    },
    quotes: {
      type: new GraphQLList(quoteType),
      resolve(parent) {
        return Collection.findQuotes(parent.id);
      },
    },
  }),
});

module.exports = {
  authorType,
  categoryType,
  workType,
  quoteType,
  userType,
  collectionType,
};
