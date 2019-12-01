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
}, {
    toJSON: {
        virtuals: true
    }
});

espacoSchema.virtual("imagem_url").get(function() {
    return `http://localhost:3333/files/${this.imagem}`
});

module.exports = mongoose.model("Espaco", espacoSchema);