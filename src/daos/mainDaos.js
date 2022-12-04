/*const {
  PERSIST_PRODUCTOS,
  PERSIST_MENSAJES,
  PERSIST_USUARIOS,
} = require("../../config");

const mensajesDaos = require(PERSIST_MENSAJES);
const productosDaos = require(PERSIST_PRODUCTOS);
const usuariosDaos = require(PERSIST_USUARIOS);

module.exports = { mensajesDaos, productosDaos, usuariosDaos };*/

const MensajesDaoArchivos = require("./mensajes/MensajesDaoArchivos");
const MensajesDaoFirebase = require("./mensajes/MensajesDaoFirebase");
const MensajesDaoMemoria = require("./mensajes/MensajesDaoMemoria");
const MensajesDaoMongoDb = require("./mensajes/MensajesDaoMongoDb");

const ProductosDaoArchivos = require("./productos/ProductosDaoArchivos");
const ProductosDaoFirebase = require("./productos/ProductosDaoFirebase");
const ProductosDaoMemoria = require("./productos/ProductosDaoMemoria");
const ProductosDaoMongoDb = require("./productos/ProductosDaoMongoDb");

const UsuariosDaoArchivos = require("./usuarios/UsuariosDaoArchivos");
const UsuariosDaoFirebase = require("./usuarios/UsuariosDaoFirebase");
const UsuariosDaoMemoria = require("./usuarios/UsuariosDaoMemoria");
const UsuariosDaoMongoDb = require("./usuarios/UsuariosDaoMongoDb");

class FactoryBD {
  createMensajesBD(data) {
    if (data.type == "mem") return new MensajesDaoMemoria();
    if (data.type == "file") return new MensajesDaoArchivos();
    if (data.type == "mongo") return new MensajesDaoMongoDb();
    if (data.type == "firebase") return new MensajesDaoFirebase();
  }
  createProductosBD(data) {
    if (data.type == "mem") return new ProductosDaoMemoria();
    if (data.type == "file") return new ProductosDaoArchivos();
    if (data.type == "mongo") return new ProductosDaoMongoDb();
    if (data.type == "firebase") return new ProductosDaoFirebase();
  }
  createProductosBD(data) {
    if (data.type == "mem") return new UsuariosDaoMemoria();
    if (data.type == "file") return new UsuariosDaoArchivos();
    if (data.type == "mongo") return new UsuariosDaoMongoDb();
    if (data.type == "firebase") return new UsuariosDaoFirebase();
  }
}
