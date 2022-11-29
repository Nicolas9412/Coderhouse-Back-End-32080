const { Router } = require("express");
const passport = require("passport");
const {
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  getFaillogin,
  getFailsignup,
  getLogout,
} = require("../controllers/auth");

const routerAuth = new Router();

routerAuth.get("/login", getLogin);
routerAuth.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  postLogin
);
routerAuth.get("/faillogin", getFaillogin);
routerAuth.get("/signup", getSignup);
routerAuth.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  postSignup
);
routerAuth.get("/failsignup", getFailsignup);
routerAuth.get("/logout", getLogout);

module.exports = routerAuth;
