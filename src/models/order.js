const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: { type: Array, require: true },
    numberOrder: { type: Number, require: true },
    datetime: { type: Date, require: true },
    state: { type: String, require: true },
    email: { type: String, require: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("orders", orderSchema);
