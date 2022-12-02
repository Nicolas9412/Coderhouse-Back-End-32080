const bcrypt = require("bcrypt");

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

module.exports = { generateHash };
