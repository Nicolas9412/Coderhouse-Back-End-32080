const express = require("express");

const {
  getRoot,
  getHome,
  getPerfil,
  getCart,
} = require("../controllers/appController");

const {
  isAuthenticated,
  isNotAuthenticated,
  isAdmin,
} = require("../middlewars/auth");

const routerApp = express.Router();

routerApp.get("/", isNotAuthenticated, getRoot);
routerApp.get("/home", isAuthenticated, getHome);
routerApp.get("/profile", isAuthenticated, getPerfil);
routerApp.get("/cart", isAuthenticated, getCart);

module.exports = routerApp;
