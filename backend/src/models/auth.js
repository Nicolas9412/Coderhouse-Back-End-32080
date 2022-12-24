const User = require("./schemas/user");

async function userByEmail(email) {
  try {
    const userExists = await User.findOne({ email });
    return userExists;
  } catch (error) {
    return error;
  }
}

async function saveUser(user) {
  try {
    const userCreated = await User.create(user);
    return userCreated;
  } catch (error) {
    return error;
  }
}

module.exports = { userByEmail, saveUser };
