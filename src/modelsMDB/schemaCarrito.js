const mongoose = require("mongoose");

const CarritoSchema = new mongoose.Schema(
  {
    timestamp: { type: Number, require: true },
    productos: { type: Array, require: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("carritos", CarritoSchema);
