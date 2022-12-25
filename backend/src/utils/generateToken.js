const jwt = require("jsonwebtoken");

function generateToken(user) {
  const token = jwt.sign(user, process.env.SECRET, {
    expiresIn: "24h",
  });
  return token;
}

module.exports = { generateToken };
