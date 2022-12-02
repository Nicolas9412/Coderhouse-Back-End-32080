const jwt = require("jsonwebtoken");
const User = require("../models/schemas/user");
const { isValidPassword } = require("../utils/isValidPassword");
const { generateToken } = require("../utils/generateToken");
const { generateHash } = require("../utils/generateHash");

async function postLogin(request, response) {
  const { body } = request;
  const { email, password } = body;

  const user = await User.findOne({ email });

  const passwordCorrect =
    user == null ? false : await isValidPassword(password, user);

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: "invalid user or password",
    });
  }

  const userForToken = {
    id: user._id,
    username: user.email,
  };

  const token = generateToken(userForToken);

  response.json({
    id: user._id,
    username: user.email,
    token,
  });
}

async function postRegister(request, response) {
  const { body } = request;
  const { fullname, phoneNumber, email, password } = body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return response.json({ error: "This user already exists" });
  }

  const user = {
    fullname,
    phoneNumber,
    email,
    password: generateHash(password),
  };

  const userCreated = await User.create(user);

  const token = generateToken(userCreated);

  response.json({
    id: userCreated._id,
    username: userCreated.email,
    token,
  });
}

module.exports = { postLogin, postRegister };
