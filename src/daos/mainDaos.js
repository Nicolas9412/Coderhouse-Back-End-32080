const {
  PERSIST_CARRITOS,
  PERSIST_PRODUCTOS,
  PERSIST_USUARIOS,
} = require("../../config");

const carritoDaos = require(PERSIST_CARRITOS);
const productosDaos = require(PERSIST_PRODUCTOS);
const usuariosDaos = require(PERSIST_USUARIOS);

module.exports = { carritoDaos, productosDaos, usuariosDaos };
