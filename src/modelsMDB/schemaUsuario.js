const mongoose = require("mongoose");
const UsuarioSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    nombre: { type: String, required: true, max: 100 },
    direccion: { type: String, required: true, max: 100 },
    edad: { type: Number, required: true, max: 100 },
    telefono: { type: String, required: true, max: 100 },
    imagen: { type: String, required: true, max: 100 },
    cart_id: { type: mongoose.Schema.ObjectId },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Usuarios", UsuarioSchema);
