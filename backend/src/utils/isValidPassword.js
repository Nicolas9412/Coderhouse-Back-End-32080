const bcrypt = require("bcrypt");

async function isValidPassword(password, user) {
  return await bcrypt.compare(password, user.password);
}

module.exports = { isValidPassword };
