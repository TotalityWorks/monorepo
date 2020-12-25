require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js');

const server = express();
const dev = process.env.NODE_ENV === 'development';

server.use(cors());
server.use(hpp());
server.get('/', (req, res) => {
  res.send('Server is running.');
});

server.use('/graphql', (req, res) => {
  graphqlHTTP({
    schema,
    graphiql: dev,
    context: { req, res },
  })(req, res);
});
server.use(helmet());

module.exports = server;
