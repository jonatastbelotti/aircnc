const Espaco = require("../models/EspacoTrabalho");
const Usuario = require("../models/Usuario");

module.exports = {
    async listar(req, res) {
        const { tecnologia } = req.query;

        const espacos = await Espaco.find({tecnologias: tecnologia});

        return res.json(espacos);
    },

    async novo(req, res) {
        const { filename } = req.file;
        const { empresa, preco, tecnologias } = req.body;
        const idUsuario = req.headers.usuario;

        const usuario = await Usuario.findById(idUsuario);
        if (!usuario) {
            res.status(400).json({erro: "Usuário não existe."});
        }

        const espaco = await Espaco.create({
            usuario: idUsuario,
            imagem: filename,
            empresa,
            preco,
            tecnologias: tecnologias.split(",").map(item => item.trim())
        });

        return res.json(espaco);
    }
};