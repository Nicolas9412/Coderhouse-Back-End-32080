const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    email: { type: String, require: true },
    datetime: { type: Date, require: true },
    products: { type: Array, require: true },
    address: { type: String, require: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("carts", cartSchema);
