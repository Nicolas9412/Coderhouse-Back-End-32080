const { knexMariaDB } = require("../config");
const { knexSQLite3 } = require("../config");
const { PERSIST_PRODUCTOS, PERSIST_CARRITOS } = require("../config");

if (
  PERSIST_PRODUCTOS.includes("DaoSQLite") ||
  PERSIST_CARRITOS.includes("DaoSQLite") ||
  PERSIST_PRODUCTOS.includes("DaoMariaDB") ||
  PERSIST_CARRITOS.includes("DaoMariaDB")
) {
  knexMariaDB.schema
    .createTableIfNotExists("productos", function (table) {
      table.increments();
      table.string("nombre");
      table.string("descripcion");
      table.string("codigo");
      table.string("foto");
      table.float("precio");
      table.integer("stock");
      table.integer("timestamp");
    })
    .then(() => console.log("table PRODUCTOS created in MariaDB"))
    .catch((error) => {
      console.log(error);
      throw error;
    });

  knexMariaDB.schema
    .createTableIfNotExists("carritos", function (table) {
      table.increments();
      table.integer("timestamp");
    })
    .then(() => console.log("table CARRITOS created in MariaDB"))
    .catch((error) => {
      console.log(error);
      throw error;
    });

  knexMariaDB.schema
    .createTableIfNotExists("ProductosCarritos", function (table) {
      table.increments();
      table.integer("idCarrito");
      table.integer("idProducto");
    })
    .then(() => console.log("table PRODUCTOSCARRITOS created in MariaDB"))
    .catch((error) => {
      console.log(error);
      throw error;
    })
    .finally(() => {
      knexMariaDB.destroy();
    });

  knexSQLite3.schema
    .createTableIfNotExists("productos", function (table) {
      table.increments();
      table.string("nombre");
      table.string("descripcion");
      table.string("codigo");
      table.string("foto");
      table.float("precio");
      table.integer("stock");
      table.integer("timestamp");
    })
    .then(() => console.log("table PRODUCTOS created in SQLite"))
    .catch((error) => {
      console.log(error);
      throw error;
    });

  knexSQLite3.schema
    .createTableIfNotExists("carritos", function (table) {
      table.increments();
      table.integer("timestamp");
    })
    .then(() => console.log("table CARRITOS created in SQLite"))
    .catch((error) => {
      console.log(error);
      throw error;
    });

  knexSQLite3.schema
    .createTableIfNotExists("ProductosCarritos", function (table) {
      table.increments();
      table.integer("idCarrito");
      table.integer("idProducto");
    })
    .then(() => console.log("table PRODUCTOSCARRITOS created in SQLite"))
    .catch((error) => {
      console.log(error);
      throw error;
    })
    .finally(() => {
      knexSQLite3.destroy();
    });
}
