const { knexMariaDB } = require("./config");
const { knexSQLite3 } = require("./config");

knexMariaDB.schema
  .createTableIfNotExists("productos", function (table) {
    table.increments();
    table.string("nombre");
    table.string("descripcion");
    table.string("codigo");
    table.string("foto");
    table.string("precio");
    table.string("stock");
    table.string("timestamp");
  })
  .then(() => console.log("table created"))
  .catch((error) => {
    console.log(error);
    throw error;
  })
  .finally(() => {
    knexMariaDB.destroy();
  });

knexMariaDB.schema
  .createTableIfNotExists("carritos", function (table) {
    table.increments();
    table.string("timestamp");
    table.string("productos");
  })
  .then(() => console.log("table created"))
  .catch((error) => {
    console.log(error);
    throw error;
  })
  .finally(() => {
    knexSQLite3.destroy();
  });

knexSQLite3.schema
  .createTableIfNotExists("carritos", function (table) {
    table.increments();
    table.string("timestamp");
    table.string("productos");
  })
  .then(() => console.log("table created"))
  .catch((error) => {
    console.log(error);
    throw error;
  })
  .finally(() => {
    knexSQLite3.destroy();
  });

knexSQLite3.schema
  .createTableIfNotExists("productos", function (table) {
    table.increments();
    table.string("nombre");
    table.string("descripcion");
    table.string("codigo");
    table.string("foto");
    table.string("precio");
    table.string("stock");
    table.string("timestamp");
  })
  .then(() => console.log("table created"))
  .catch((error) => {
    console.log(error);
    throw error;
  })
  .finally(() => {
    knexMariaDB.destroy();
  });
