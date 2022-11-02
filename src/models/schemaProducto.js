const mongoose = require("mongoose");

const ProductosSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    price: { type: Number, require: true },
    thumbnail: { type: String, require: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("productos", ProductosSchema);
