const { userByEmail, saveUser } = require("../models/auth");
const { generateToken } = require("../utils/generateToken");
const { generateHash } = require("../utils/generateHash");
const { isValidPassword } = require("../utils/isValidPassword");
const { serialize } = require("cookie");

async function registerUser(
  fullname,
  phoneNumber,
  email,
  password,
  confirmPassword
) {
  const userExists = await userByEmail(email);
  if (userExists) {
    return { error: "This user already exists" };
  } else if (password != confirmPassword) {
    return { error: "Passwords do not match" };
  }
  const user = {
    fullname,
    phoneNumber,
    email,
    password: generateHash(password),
  };

  const userCreated = await saveUser(user);

  const token = generateToken(userCreated);

  const serialized = serialize("myTokenName", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 86400,
    path: "/",
  });
  return {
    id: user._id,
    username: user.email,
    serialized,
  };
}

async function loginUser(email, password) {
  const user = await userByEmail(email);

  const passwordCorrect =
    user == null ? false : await isValidPassword(password, user);

  if (!(user && passwordCorrect)) {
    return {
      error: "invalid user or password",
    };
  }

  const userForToken = {
    id: user._id,
    username: user.email,
  };

  const token = generateToken(userForToken);

  const serialized = serialize("myTokenName", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 86400,
    path: "/",
  });
  return {
    id: user._id,
    username: user.email,
    serialized,
  };
}

module.exports = { registerUser, loginUser };
