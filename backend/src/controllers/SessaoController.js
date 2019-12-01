const Usuario = require("../models/Usuario");


module.exports = {
    async novo(req, res) {
        const { email } = req.body;

        // Procura um usuário no banco de dados com esse e-mail
        let usuario = await Usuario.findOne({email});

        // Se não tem o cria
        if (!usuario) {
            usuario = await Usuario.create({email});
        }

        return res.json(usuario);
    }
};