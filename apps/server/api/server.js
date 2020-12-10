const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send('Server is running.');
});

module.exports = server;
