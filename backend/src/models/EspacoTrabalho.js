const mongoose = require("mongoose");

// Definindo o esquema do objeto
const espacoSchema = new mongoose.Schema({
    imagem: String,
    empresa: String,
    preco: Number,
    tecnologias: [String],
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    }
});

module.exports = mongoose.model("Espaco", espacoSchema);