const mongoose = require("mongoose");

// Definindo o esquema do objeto usuário
const usuSchema = new mongoose.Schema({
    "nome": String,
    "email": String,
    "senha": String
});

module.exports = mongoose.model("Usuario", usuSchema);