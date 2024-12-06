// src/components/Avaliacoes/ListarAvaliacoes.js
import React, { useState, useEffect } from 'react';
import { fetchAvaliacoes } from '../../services/api'; // Função que busca as avaliações da API
import './Avaliacoes.css'

const ListarAvaliacoes = () => {
    const [avaliacoes, setAvaliacoes] = useState([]);

    useEffect(() => {
        async function loadAvaliacoes() {
            const data = await fetchAvaliacoes();
            setAvaliacoes(data);
        }
        loadAvaliacoes();
    }, []);

    return (
        <div className="avaliacoes-container">
            <h2>Lista de Avaliações</h2>
            <ul>
                {avaliacoes.length === 0 ? (
                    <li>Nenhuma avaliação encontrada.</li>
                ) : (
                    avaliacoes.map((avaliacao) => (
                        <li key={avaliacao._id}>
                             {avaliacao.comentario} (Nota: {avaliacao.nota})
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default ListarAvaliacoes;
