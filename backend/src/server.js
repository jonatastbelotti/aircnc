const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");


const app = express();

// Criando conexão com o banco de dados
mongoose.connect("mongodb+srv://omnistack:omnistack@pessoal-4bwpv.mongodb.net/aircnc?retryWrites=true&w=majority", {
    useNewUrlParser: true, // para não exibir os logs enquanto conecta
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);


app.listen(3333);