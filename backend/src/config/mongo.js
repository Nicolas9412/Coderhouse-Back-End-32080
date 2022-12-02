// Config Mongo DB Atlas
const mongoose = require("mongoose");
require("dotenv").config();

const connectMDB = async () => {
  try {
    const URL = process.env.MONGODB_URI;
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUniFiedTopology: true,
    });
    console.log("Connect MongoDB");
  } catch (error) {
    console.log(error);
  }
};

const disconnectMDB = () => {
  mongoose.disconnect();
};

module.exports = { connectMDB, disconnectMDB };
