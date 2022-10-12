const mongoose = require("mongoose");
const UsuarioSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
  },
  { versionKey: false }
);

module.exports = mongoose.model("usuarios", UsuarioSchema);
