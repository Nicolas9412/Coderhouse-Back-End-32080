const {
  PERSIST_PRODUCTOS,
  PERSIST_MENSAJES,
  PERSIST_USUARIOS,
} = require("../../config");

const mensajesDaos = require(PERSIST_MENSAJES);
const productosDaos = require(PERSIST_PRODUCTOS);
const usuariosDaos = require(PERSIST_USUARIOS);

module.exports = { mensajesDaos, productosDaos, usuariosDaos };
