const Espaco = require("../models/EspacoTrabalho");

module.exports = {
    async buscar(req, res) {
        const { usuario } = req.headers;

        const espacos = await Espaco.find({usuario: usuario});

        return res.json(espacos);
    }
};