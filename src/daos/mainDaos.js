const { PERSIST_PRODUCTOS, PERSIST_MENSAJES } = require("../../config");

const mensajesDaos = require(PERSIST_MENSAJES);
const productosDaos = require(PERSIST_PRODUCTOS);

module.exports = { mensajesDaos, productosDaos };
