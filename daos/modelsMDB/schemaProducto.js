const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema(
  {
    timestamp: { type: Number, require: false },
    nombre: { type: String, require: true },
    descripcion: { type: String, require: true },
    codigo: { type: String, require: true },
    foto: { type: String, require: true },
    precio: { type: Number, require: true },
    stock: { type: Number, require: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("productos", ProductoSchema);
