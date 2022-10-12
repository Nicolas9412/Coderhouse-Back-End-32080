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

// config.js
module.exports = {
  PERSIST_USUARIOS: "./usuarios/UsuariosDaoMongoDb",
  connectMDB,
  disconnectMDB,
};
