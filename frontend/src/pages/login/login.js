import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import api from '../../services/api';

import './style.css';

export default function Login({ history }) {
    const [showModal, setShowModal] = useState(false);
    const [textModal, setTextoModal] = useState("");

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // Funções para exibir e esconder o Modal
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // Criando função que vai enviar os dados de entrada
    async function entrar(event) {
        event.preventDefault();

        try {
            const resposta = await api.post("/login", { email, senha });
            localStorage.setItem("usuario", resposta.data._id);
            history.push("/dashboard");
        } catch (error) {
            setTextoModal(error.response.data.mensagem);
            handleShow();
        }

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
                    placeholder="Seu e-mail."
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <label htmlFor="senha">Senha*</label>
                <input
                    id="senha"
                    type="password"
                    placeholder="Sua senha."
                    value={senha}
                    onChange={event => setSenha(event.target.value)}
                />

                <p>Ainda não tem uma conta? <Link to="/novo_usuario"><span>Criar conta.</span></Link></p>

                <button type="submit" className="btn">Entrar</button>
            </form>

            <Modal show={showModal} onHide={handleClose} onClose={handleClose} delay={3000}>
                <Modal.Header closeButton>
                    <Modal.Title>Erro!</Modal.Title>
                </Modal.Header>

                <Modal.Body>{textModal}</Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}