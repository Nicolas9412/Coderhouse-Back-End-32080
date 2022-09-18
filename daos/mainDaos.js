const config = require("../config");
const carritoDaos = require(config.PERSIST_CARRITOS);
const productosDaos = require(config.PERSIST_PRODUCTOS);

module.exports = { carritoDaos, productosDaos };
