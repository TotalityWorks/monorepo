const bcrypt = require('bcryptjs');

function hash(user) {
  const hashedUser = user;
  const passwordHash = bcrypt.hashSync(user.password, 10);
  hashedUser.password = passwordHash;
  return hashedUser;
}

function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

function salt() {
  const salt1 = bcrypt.genSaltSync();
  const salt2 = bcrypt.genSaltSync();
  const salt3 = bcrypt.genSaltSync();
  const final = bcrypt.hashSync(salt1 + salt2 + salt3, 10);
  return final;
}

module.exports = {
  hash,
  comparePassword,
  salt,
};
