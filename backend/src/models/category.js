const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("categories", categorySchema);
