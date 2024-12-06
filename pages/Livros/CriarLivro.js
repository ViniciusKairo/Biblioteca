import React, { useState } from 'react';
import { createLivro } from '../../services/api';
import './CriarLivro.css';

function CriarLivro() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [anoPublicacao, setAnoPublicacao] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Gera uma lista de anos válidos (por exemplo, de 1900 até o ano atual)
    const anosDisponiveis = Array.from(
        { length: new Date().getFullYear() - 1899 },
        (_, i) => 1900 + i
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        if (!titulo || !autor || !anoPublicacao) {
            setError('Por favor, preencha todos os campos.');
            setLoading(false);
            return;
        }

        try {
            const bookData = { Titulo: titulo, Autor: autor, Ano_Publicacao: anoPublicacao };
            console.log('Dados do livro sendo enviados:', bookData); // Adicionando o log
            const response = await createLivro(bookData);
            alert('Livro criado com sucesso!');

            setTitulo('');
            setAutor('');
            setAnoPublicacao('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="criar-livro">
            <h2>Criar Livro</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="titulo">Título:</label>
                    <input
                        type="text"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="autor">Autor:</label>
                    <input
                        type="text"
                        id="autor"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="ano_publicacao">Ano de Publicação:</label>
                    <select
                        id="ano_publicacao"
                        value={anoPublicacao}
                        onChange={(e) => setAnoPublicacao(e.target.value)}
                        required
                    >
                        <option value="">Selecione um ano</option>
                        {anosDisponiveis.map((ano) => (
                            <option key={ano} value={ano}>
                                {ano}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Criando...' : 'Criar Livro'}
                </button>
            </form>
        </div>
    );
}

export default CriarLivro;
