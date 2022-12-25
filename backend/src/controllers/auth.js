const { registerUser, loginUser } = require("../services/auth");

async function postLogin(request, response) {
  const { body } = request;
  const { email, password } = body;

  const result = await loginUser(email, password);
  if (!result.error) {
    response.setHeader("Set-Cookie", result.serialized);
  }
  return response.json(result);
}

async function postRegister(request, response) {
  const { body } = request;
  const { fullname, phoneNumber, email, password, confirmPassword } = body;

  const result = await registerUser(
    fullname,
    phoneNumber,
    email,
    password,
    confirmPassword
  );

  if (!result.error) {
    response.append("Set-Cookie", result.serialized);
  }
  return response.json({
    id: result.id,
    username: result.username,
    token: result.serialized,
  });
}

module.exports = { postLogin, postRegister };
