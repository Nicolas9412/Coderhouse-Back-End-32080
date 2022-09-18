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

const serviceAccount = require("./daos/db/segunda-entrega-proyecto-final-firebase-adminsdk-172da-d1b8a77230.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const DB_FIREBASE = admin.firestore();

// config.js
module.exports = {
  PERSIST_CARRITOS: "./carritos/CarritosDaoFirebase",
  PERSIST_PRODUCTOS: "./productos/ProductosDaoMongoDb",
  DB_FIREBASE,
  connectMDB,
  disconnectMDB,
};
