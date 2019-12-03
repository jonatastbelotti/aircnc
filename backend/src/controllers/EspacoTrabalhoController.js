const Espaco = require("../models/EspacoTrabalho");
const Usuario = require("../models/Usuario");

module.exports = {
    async listar(req, res) {
        const { tecnologia } = req.query;

        const espacos = await Espaco.find({tecnologias: tecnologia});

        return res.json(espacos);
    },

    async buscar(req, res) {
        const { usuario } = req.headers;
        const { id } = req.params;

        espaco = await Espaco.findById(id);

        return res.json(espaco);
    },

    async novo(req, res) {
        const { filename } = req.file;
        const { _id, empresa, preco, tecnologias } = req.body;
        const idUsuario = req.headers.usuario;

        const usuario = await Usuario.findById(idUsuario);
        if (!usuario) {
            res.status(400).json({erro: "Usuário não existe."});
        }

        // Se não tem id cria
        let espaco = null;
        if (!_id || _id == null || _id == "null") {
            console.log("Inserindo");
            espaco = await Espaco.create({
                usuario: idUsuario,
                imagem: filename,
                empresa,
                preco,
                tecnologias: tecnologias.split(",").map(item => item.trim())
            });
        } else {
            console.log("Editando");
            espaco = await Espaco.updateOne({_id}, {
                usuario: idUsuario,
                empresa,
                preco,
                tecnologias: tecnologias.split(",").map(item => item.trim())
            });
        }

        return res.json(espaco);
    }
};