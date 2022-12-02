const { Router } = require("express");
const { postLogin, postRegister } = require("../controllers/auth");

const routerAuth = new Router();

routerAuth.post("/login", postLogin);
routerAuth.post("/register", postRegister);

module.exports = routerAuth;
