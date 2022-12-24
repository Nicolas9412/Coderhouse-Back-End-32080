const { registerUser, loginUser } = require("../services/auth");

async function postLogin(request, response) {
  const { body } = request;
  const { email, password } = body;

  const result = await loginUser(email, password);

  response.json(result);
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

  response.json(result);
}

module.exports = { postLogin, postRegister };
