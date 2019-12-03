const Usuario = require("../models/Usuario");


module.exports = {
    async entrar(req, res) {
        const {email, senha} = req.body;

        if (!email || !senha) {
            return res.status(400).json({"status": "ERRO", "mensagem": "Verifique os campos obrigatórios."});
        }

        // Procura um usuário no banco de dados com esse e-mail
        let usuario = await Usuario.findOne({email, senha});
        if (!usuario) {
            return res.status(400).json({"status": "ERRO", "mensagem": "E-mail ou senha incorretos."});
        }

        return res.json(usuario);
    }
};