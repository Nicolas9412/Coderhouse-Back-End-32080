const jwt = require("jsonwebtoken");

function generateToken(user) {
  const token = jwt.sign(user.toJSON(), process.env.SECRET, {
    expiresIn: "24h",
  });
  console.log("token", token);
  return token;
}

module.exports = { generateToken };
