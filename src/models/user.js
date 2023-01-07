const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    isAdmin: { type: Boolean, require: false },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
