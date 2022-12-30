const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    thumbnail: { type: String, require: true },
    stock: { type: Number, require: true },
    category: { type: String, require: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("products", productSchema);
