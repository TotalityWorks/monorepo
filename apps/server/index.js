const server = require('./api/server.js');

const port = process.env.PORT || 9999;

module.exports = server.listen(port);
