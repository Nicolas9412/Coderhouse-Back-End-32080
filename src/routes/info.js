const { Router } = require("express");
const {
  getInfoProcessBloq,
  getInfoProcessNoBloq,
} = require("../controllers/info");

const routerInfo = new Router();

routerInfo.get("/bloq", getInfoProcessBloq);
routerInfo.get("/noBloq", getInfoProcessNoBloq);

module.exports = routerInfo;
