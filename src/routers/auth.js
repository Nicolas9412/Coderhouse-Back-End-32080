const express = require("express");
const passport = require("passport");

const {
  getRoot,
  getSignup,
  getLogin,
  postLogin,
  postSignup,
  getFailLogin,
  getFailSignup,
  getLogout,
} = require("../controllers/authController");
const { isNotAuthenticated } = require("../middlewars/auth");

const routerAuth = express.Router();

routerAuth.get("/", isNotAuthenticated, getRoot);
routerAuth.get("/login", isNotAuthenticated, getLogin);
routerAuth.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  postLogin
);
routerAuth.get("/faillogin", getFailLogin);
routerAuth.get("/signup", isNotAuthenticated, getSignup);
routerAuth.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  postSignup
);
routerAuth.get("/failsignup", getFailSignup);
routerAuth.get("/logout", getLogout);

module.exports = routerAuth;
