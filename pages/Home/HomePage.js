import React, { useEffect, useState } from 'react';
import { fetchUsuarios, fetchLivros, fetchAvaliacoes } from '../../services/api';
import './HomePage.css'; // Importando o arquivo de estilos

function HomePage() {
    const [usuarios, setUsuarios] = useState([]);
    const [livros, setLivros] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [activeSection, setActiveSection] = useState('usuarios'); // 'usuarios', 'livros', ou 'avaliacoes'

    useEffect(() => {
        async function loadData() {
            const usuariosData = await fetchUsuarios();
            const livrosData = await fetchLivros();
            setUsuarios(usuariosData);
            setLivros(livrosData);
        }
        loadData();
    }, []);

    const loadAvaliacoes = async () => {
        try {
            const avaliacoesData = await fetchAvaliacoes();
            setAvaliacoes(avaliacoesData);
        } catch (error) {
            console.error('Erro ao carregar avaliações:', error);
        }
    };

    return (
        <div className="home-page">
            <h1>Bem-vindo à Biblioteca</h1>

            <div className="button-group">
                <button
                    onClick={() => {
                        setActiveSection('usuarios');
                        loadAvaliacoes(); // Não carregar as avaliações se não for necessário
                    }}
                    className={activeSection === 'usuarios' ? 'active' : ''}
                >
                    Usuários
                </button>
                <button
                    onClick={() => {
                        setActiveSection('livros');
                        loadAvaliacoes(); // Não carregar as avaliações se não for necessário
                    }}
                    className={activeSection === 'livros' ? 'active' : ''}
                >
                    Livros
                </button>
               
            </div>

            {activeSection === 'usuarios' && (
                <section className="list-section">
                    <h2>Usuários</h2>
                    <ul>
                        {usuarios.map((user) => (
                            <li key={user.ID_Usuario}>
                                {user.Nome} ({user.Email})
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {activeSection === 'livros' && (
                <section className="list-section">
                    <h2>Livros</h2>
                    <ul>
                        {livros.map((book) => (
                            <li key={book.ID_Livro}>
                                {book.Titulo} por {book.Autor}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

           
        </div>
    );
}

export default HomePage;
