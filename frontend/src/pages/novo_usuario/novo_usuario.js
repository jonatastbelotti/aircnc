import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import api from '../../services/api';

import './style.css';

export default function NovoUsuario({ history }) {
    const [showModal, setShowModal] = useState(false);
    const [textModal, setTextoModal] = useState("");

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // Funções para exibir e esconder o Modal
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // Função que cadastra um novo usuário
    async function cadastrarUsuario(event) {
        event.preventDefault();

        try {
            await api.post("/usuario", {nome, email, senha});
            history.push("/");
        } catch (error) {
            handleShow();
            setTextoModal(error.response.data.mensagem);
        }
    }

    return (
        <>
        <form onSubmit={cadastrarUsuario}>
            <label htmlFor="nome">Seu nome*</label>
            <input
                id="nome"
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={event => setNome(event.target.value)}
            />

            <label htmlFor="email">Seu e-mail*</label>
            <input
                id="email"
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />

            <label htmlFor="senha">Sua senha*</label>
            <input
                id="senha"
                type="password"
                placeholder="Sua senha"
                value={senha}
                onChange={event => setSenha(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>
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