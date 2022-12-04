require("dotenv").config();
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

// Config Firebase
const admin = require("firebase-admin");

const serviceAccount = require("./db/segunda-entrega-proyecto-final-firebase-adminsdk-172da-d1b8a77230.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const DB_FIREBASE = admin.firestore();

// config.js
module.exports = {
  PERSIST_PRODUCTOS: "./productos/ProductosDaoMongoDb",
  PERSIST_MENSAJES: "./mensajes/MensajesDaoMongoDb",
  PERSIST_USUARIOS: "./usuarios/UsuariosDaoMongoDb",
  DB_FIREBASE,
  connectMDB,
  disconnectMDB,
};
