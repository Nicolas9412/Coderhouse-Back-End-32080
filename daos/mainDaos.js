const config = require("../config");
const carritoDaos = require(config.PERSIST_CARRITOS);
const productosDaos = require(config.PERSIST_PRODUCTOS);
const ProductosCarritosDaos = require(config.PERSIST_PRODUCTOSCARRITOS);

module.exports = { carritoDaos, productosDaos, ProductosCarritosDaos };
