// Config MariaDB
const optionsMariaDB = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    database: "ecommerce",
  },
};

const knexMariaDB = require("knex")(optionsMariaDB);

// Config Sqlite3
const optionsSQLite3 = {
  client: "sqlite3",
  connection: {
    filename: "./db/ecommerce.sqlite",
  },
  userNullAsDefault: true,
};

const knexSQLite3 = require("knex")(optionsSQLite3);

// Config Mongo DB Atlas
const mongoose = require("mongoose");

const connectMDB = async () => {
  try {
    const URL =
      "mongodb+srv://Nicolas9412:admin123@cluster0.x4k71fz.mongodb.net/ecommerce?retryWrites=true&w=majority";
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUniFiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const disconnectMDB = () => {
  mongoose.disconnect();
};

// Config Firebase
const admin = require("firebase-admin");

const serviceAccount = require("./db/segunda-entrega-proyecto-final-firebase-adminsdk-172da-d1b8a77230.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const DB_FIREBASE = admin.firestore();

// config.js
module.exports = {
  PERSIST_CARRITOS: "./carritos/CarritosDaoMariaDB",
  PERSIST_PRODUCTOS: "./productos/ProductosDaoFirebase",
  PERSIST_PRODUCTOSCARRITOS: "./productosCarritos/ProductosCarritosDaoMariaDB",
  DB_FIREBASE,
  connectMDB,
  disconnectMDB,
  knexMariaDB,
  knexSQLite3,
};
