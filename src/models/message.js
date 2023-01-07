const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    email: { type: String, require: true },
    type: { type: String, require: true },
    datetime: { type: Date, require: true },
    body: { type: String, require: true },
    read: { type: Boolean, require: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("messages", messageSchema);
