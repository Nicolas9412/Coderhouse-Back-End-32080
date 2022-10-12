const { PERSIST_USUARIOS } = require("../../config");

const usuarioDaos = require(PERSIST_USUARIOS);

module.exports = { usuarioDaos };
