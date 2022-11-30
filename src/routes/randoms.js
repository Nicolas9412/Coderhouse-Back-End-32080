const { Router } = require("express");
const { getRandoms } = require("../controllers/randoms");
const { isAuthenticated } = require("../middlewares/auth");

const routerRandoms = new Router();

routerRandoms.get("/", isAuthenticated, getRandoms);

module.exports = routerRandoms;
