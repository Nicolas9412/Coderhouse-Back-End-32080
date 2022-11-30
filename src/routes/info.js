const { Router } = require("express");
const {
  getInfoProcessBloq,
  getInfoProcessNoBloq,
} = require("../controllers/info");
const { isAuthenticated } = require("../middlewares/auth");

const routerInfo = new Router();

routerInfo.get("/bloq", isAuthenticated, getInfoProcessBloq);
routerInfo.get("/noBloq", isAuthenticated, getInfoProcessNoBloq);

module.exports = routerInfo;
