const Reserva = require("../models/Reserva");

module.exports = {
    async novo(req, res) {
        const { usuario } = req.headers;
        const espaco = req.params.id;
        const { data } = req.body;

        const reserva = await Reserva.create({
            usuario,
            espaco,
            data
        });

        await reserva.populate("espaco").populate("usuario").execPopulate();

        return res.json(reserva);
    }
};