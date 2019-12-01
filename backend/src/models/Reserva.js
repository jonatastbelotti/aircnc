const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema({
    data: String,
    aprovada: Boolean,
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },
    espaco: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Espaco"
    }
});

module.exports = mongoose.model("Reserva", ReservaSchema);