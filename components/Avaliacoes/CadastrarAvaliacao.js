// src/components/Avaliacoes/CadastrarAvaliacao.js
import React, { useState } from 'react';
import { postAvaliacao } from '../../services/api'; // Função que envia a avaliação para a API
import './Avaliacoes.css'

const CadastrarAvaliacao = () => {
    const [usuario, setUsuario] = useState('');
    const [comentario, setComentario] = useState('');
    const [nota, setNota] = useState(1);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const avaliacaoData = { usuario, comentario, nota };
            await postAvaliacao(avaliacaoData);
            setMessage('Avaliação cadastrada com sucesso!');
            setUsuario('');
            setComentario('');
            setNota(1);
        } catch (error) {
            setMessage('Erro ao cadastrar avaliação.');
        }
    };

    return (
        <div className="avaliacao-form-container">
            <h2>Cadastrar Avaliação</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                
                <div>
                    <label htmlFor="comentario">Comentário</label>
                    <textarea
                        id="comentario"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="nota">Nota</label>
                    <input
                        type="number"
                        id="nota"
                        value={nota}
                        onChange={(e) => setNota(e.target.value)}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <button type="submit">Cadastrar Avaliação</button>
            </form>
        </div>
    );
};

export default CadastrarAvaliacao;
