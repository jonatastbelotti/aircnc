const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const UsuarioController = require("./controllers/UsuarioController");
const LoginController = require("./controllers/LoginController");
const EspacoController = require("./controllers/EspacoTrabalhoController");
const DashboardController = require("./controllers/DashboardController");
const ReservaController = require("./controllers/ReservaController");

const routes = express.Router();
const upload = multer(uploadConfig);

// req.query -> acessa os filtros da URL (/usuarios?nome=mario&idade=25)
// req.params -> acessa os parametros da URL (/usuario/13)
// req.body -> acessa o corpo da requisição

routes.get("/dashboard", DashboardController.buscar);
routes.get("/espaco", EspacoController.listar);
routes.post("/espaco", upload.single("imagem"), EspacoController.novo);
routes.get("/espaco/:id", EspacoController.buscar);
routes.post("/espaco/:id/reserva", ReservaController.novo);
routes.post("/usuario", UsuarioController.novo);
routes.post("/login", LoginController.entrar);


module.exports = routes;