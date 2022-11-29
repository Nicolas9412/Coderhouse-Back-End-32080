require("dotenv").config();
// Config Mongo DB Atlas
const mongoose = require("mongoose");

const connectMDB = async () => {
  try {
    const URL = process.env.CONNECTION_MONGO_ATLAS;
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
  PERSIST_PRODUCTOS: "./productos/ProductosDaoMongoDb",
  PERSIST_MENSAJES: "./mensajes/MensajesDaoMongoDb",
  PERSIST_USUARIOS: "./usuarios/UsuariosDaoMongoDb",
  connectMDB,
  disconnectMDB,
};
