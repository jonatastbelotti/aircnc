import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';

import './style.css';
import camera from '../../assets/camera.svg';

export default function Espaco({ history, match }) {
    const [_id, setId] = useState(null);
    const [empresa, setEmpresa] = useState("");
    const [tecnologias, setTecnologias] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState(null);

    const visualizacao = useMemo(
        () => {
            if (imagem) {
                return URL.createObjectURL(imagem);
            }

            return null;
        },
        [imagem]
    );

    // Setando uma função para ser executada assim que o componente é exibido
    useEffect(() => {buscarEspaco()}, []);

    // Função que irá buscar o espaço se for edição
    async function buscarEspaco() {
        if (match && "id" in match.params) {
            const usuario = await localStorage.getItem("usuario");
            const espaco = await api.get("/espaco/"+match.params.id, {
                headers: {
                    usuario
                }
            });

            setId(espaco.data._id);
            setEmpresa(espaco.data.empresa);
            setTecnologias(espaco.data.tecnologias.join(","));
            setPreco(espaco.data.preco);
        }
    }

    async function cadastrarEspaco(event) {
        event.preventDefault();
        const usuario = localStorage.getItem("usuario");

        const data = new FormData();
        data.append("_id", _id);
        data.append("imagem", imagem);
        data.append("empresa", empresa);
        data.append("tecnologias", tecnologias);
        data.append("preco", preco);

        await api.post("/espaco", data, {
            headers: {
                usuario
            }
        });

        history.push("/dashboard");
    }

    return (
        <form onSubmit={cadastrarEspaco}>
            <label
                id="imagem"
                style={{backgroundImage: `url(${visualizacao})`}}
                className={imagem ? "tem-imagem" : ""}
            >
                <input
                    type="file"
                    onChange={event => setImagem(event.target.files[0])}
                />
                <img src={camera} alt="Imagem camera"/>
            </label>

            <label htmlFor="empresa">Sua empresa*</label>
            <input
                id="empresa"
                type="text"
                placeholder="Sua empresa"
                value={empresa}
                onChange={event => setEmpresa(event.target.value)}
            />

            <label htmlFor="tecnologias">Tecnologias* <span>(Separadas por vírgula)</span></label>
            <input
                id="tecnologias"
                placeholder="Quais tecnologias usam?"
                value={tecnologias}
                onChange={event => setTecnologias(event.target.value)}
            />

            <label htmlFor="preco">Valor da diaria* <span>(Em branco para gratuito)</span></label>
            <input
                id="preco"
                placeholder="Preço cobrado por diaria"
                value={preco}
                onChange={event => setPreco(event.target.value)}
            />

            <button type="submit" className="btn">Salvar</button>
        </form>
    );
}