const server = require('./api/server.js');

const port = process.env.PORT;

module.exports = server.listen(port);
