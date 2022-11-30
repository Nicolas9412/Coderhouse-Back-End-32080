const { Router } = require("express");
const { getInfoBloq, getInfoNoBloq } = require("../controllers/info");

const routerInfo = new Router();

routerInfo.get("/bloq", getInfoBloq);
routerInfo.get("/noBloq", getInfoNoBloq);

module.exports = routerInfo;
