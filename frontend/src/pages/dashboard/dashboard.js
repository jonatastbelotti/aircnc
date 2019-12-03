import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './style.css';

export default function Dashboard() {
    const [espacos, setEspacos] = useState([]);

    // Setando uma função para ser executada assim que o componente é exibido
    useEffect(() => {buscarEspacos()}, []);

    // Função que irá buscar a lista de espaços
    async function buscarEspacos() {
        const usuario = localStorage.getItem("usuario");
        const resposta = await api.get("/dashboard", {
            headers: {
                usuario
            }
        });

        setEspacos(resposta.data);
    }

    return (
        <>
            <ul className="lista-espacos">
                {espacos.map(espaco => (
                    <Link to={`/espaco/${espaco._id}`}>
                        <li key={espaco._id}>
                            <header style={{backgroundImage: `url(${espaco.imagem_url})`}}/>
                            <strong>{espaco.empresa}</strong>
                            <span>{espaco.preco ? `R$${espaco.preco}/dia` : `GRATUITO`}</span>
                        </li>
                    </Link>
                ))}
            </ul>

            <Link to="/espaco">
                <button className="btn">
                    Novo espaço
                </button>
            </Link>
        </>
    );
}