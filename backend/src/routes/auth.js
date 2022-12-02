const { Router } = require("express");
const { postLogin, postRegister } = require("../controllers/auth");

const routerAuth = new Router();

routerAuth.post("/login", postLogin);
routerAuth.register("/register", postRegister);

module.exports = routerAuth;
