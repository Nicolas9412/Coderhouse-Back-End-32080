const { Router } = require("express");
const { getHome } = require("../controllers/app");

const routerApp = new Router();
const { isAuthenticated } = require("../middlewares/auth");

routerApp.get("/home", isAuthenticated, getHome);

module.exports = routerApp;
