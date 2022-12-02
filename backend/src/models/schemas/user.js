const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("users", UserSchema);
