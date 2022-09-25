const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    author: { type: Object, require: true },
    mensaje: { type: String, require: true },
    fecha: { type: String, require: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("chats", ChatSchema);
