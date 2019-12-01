import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState("");

    // Criando função que vai enviar os dados de entrada
    async function entrar(event) {
        event.preventDefault();

        const resposta = await api.post("/usuario", { email });

        localStorage.setItem("usuario", resposta.data._id);

        history.push("/dashboard");
    }

    return (
        <>
            <p>
            Ofereça <strong>espaços</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.
            </p>

            <form onSubmit={entrar}>
            <label htmlFor="email">E-mail*</label>
            <input
                id="email"
                type="email"
                placeholder="Seu melhor e-mail."
                value={email}
                onChange={event => setEmail(event.target.value)}
            />

            <button type="submit" className="btn">Entrar</button>
            </form>
        </>
    );
}