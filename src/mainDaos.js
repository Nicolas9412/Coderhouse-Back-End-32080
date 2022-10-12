const {
  PERSIST_CARRITOS,
  PERSIST_PRODUCTOS,
  PERSIST_PRODUCTOSCARRITOS,
} = require("../../config");

const carritoDaos = require(PERSIST_CARRITOS);
const productosDaos = require(PERSIST_PRODUCTOS);
const productosCarritosDaos = require(PERSIST_PRODUCTOSCARRITOS);

module.exports = { carritoDaos, productosDaos, productosCarritosDaos };
