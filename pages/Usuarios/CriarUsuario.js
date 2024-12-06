// src/components/CriarUsuario.js
import React, { useState } from 'react';
import { createUsuario } from '../../services/api';  // Importa a função para criar usuário
import './CriarUsuario.css';  // Importando o CSS específico

function CriarUsuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');  // Adiciona o estado para telefone
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            // Verificação extra de dados antes de enviar
            if (!nome || !email || !telefone || !/\S+@\S+\.\S+/.test(email)) {
                setError('Por favor, preencha todos os campos corretamente.');
                return;
            }

            const userData = { nome, email, telefone };  // Envia nome, email e telefone
            const response = await createUsuario(userData);
            setSuccess(true);
            setNome('');
            setEmail('');
            setTelefone('');  // Limpa o telefone após a criação
        } catch (err) {
            setError('Erro ao criar usuário: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="criar-usuario">
            <h2>Criar Usuário</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="nome">Nome:</label>
                    <input 
                        type="text" 
                        id="nome" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="telefone">Telefone:</label>
                    <input 
                        type="text" 
                        id="telefone" 
                        value={telefone} 
                        onChange={(e) => setTelefone(e.target.value)} 
                        required 
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">Usuário criado com sucesso!</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Criando...' : 'Criar Usuário'}
                </button>
            </form>
        </div>
    );
}

export default CriarUsuario;
