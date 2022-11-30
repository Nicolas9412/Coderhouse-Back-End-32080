const { Router } = require("express");
const passport = require("passport");
const { isNotAuthenticated } = require("../middlewares/auth");
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

//routerAuth.get("/", isNotAuthenticated, getRoot);
routerAuth.get("/login", isNotAuthenticated, getLogin);
routerAuth.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/auth/faillogin" }),
  postLogin
);
routerAuth.get("/faillogin", getFaillogin);
routerAuth.get("/signup", isNotAuthenticated, getSignup);
routerAuth.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/auth/failsignup" }),
  postSignup
);
routerAuth.get("/failsignup", getFailsignup);
routerAuth.get("/logout", getLogout);

module.exports = routerAuth;
