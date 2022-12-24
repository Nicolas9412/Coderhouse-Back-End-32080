const { Router } = require("express");
const { postLogin, postRegister } = require("../controllers/auth");
const validator = require("../middlewares/validators");

const routerAuth = new Router();

routerAuth.post("/login", validator("login"), postLogin);
routerAuth.post("/register", validator("register"), postRegister);

module.exports = routerAuth;
