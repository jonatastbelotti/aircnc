const Usuario = require("../models/Usuario");


module.exports = {
    async novo(req, res) {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({"status": "ERRO", "mensagem": "Verifique os campos obrigatórios."});
        }

        // Procura um usuário no banco de dados com esse e-mail
        let usuario = await Usuario.findOne({email});
        if (usuario) {
            return res.status(400).json({"status": "ERRO", "mensagem": "Já existe um usuário cadastrado com esse e-mail."});
        }

        // Se não tem o cria
        if (!usuario) {
            usuario = await Usuario.create({nome, email, senha});
        }

        return res.json(usuario);
    }
};