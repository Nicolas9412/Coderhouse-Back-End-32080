const mongoose = require("mongoose");

const MensajesSchema = new mongoose.Schema(
  {
    email: { type: String, require: true },
    mensaje: { type: String, require: true },
    fecha: { type: String, require: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("mensajes", MensajesSchema);
