const dotenv = require("dotenv");
dotenv.config();

// Config Mongo DB Atlas
const mongoose = require("mongoose");

const connectMDB = async () => {
  try {
    const URL = process.env.MONGODB_URI;
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

// config.js
module.exports = {
  PERSIST_CARRITOS: "./carritos/CarritosDaoMongoDb",
  PERSIST_PRODUCTOS: "./productos/ProductosDaoMongoDb",
  PERSIST_USUARIOS: "./usuarios/UsuariosDaoMongoDb",
  connectMDB,
  disconnectMDB,
};
