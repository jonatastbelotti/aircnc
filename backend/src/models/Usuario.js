const mongoose = require("mongoose");

// Definindo o esquema do objeto usuário
const usuSchema = new mongoose.Schema({
    "email": String
});

module.exports = mongoose.model("Usuario", usuSchema);