const API_BASE = 'http://localhost:3000';

// Função para buscar os usuários
export async function fetchUsuarios() {
    try {
        const response = await fetch(`${API_BASE}/usuarios`);
        if (!response.ok) {
            throw new Error(`Falha ao buscar usuários: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw new Error('Erro ao buscar usuários');
    }
}

// Função para buscar os livros
export async function fetchLivros() {
    try {
        const response = await fetch(`${API_BASE}/livros`);
        if (!response.ok) {
            throw new Error(`Falha ao buscar livros: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        throw new Error('Erro ao buscar livros');
    }
}

// Função para criar um novo usuário
export async function createUsuario(userData) {
    try {
        const response = await fetch(`${API_BASE}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Falha ao criar usuário');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw new Error('Erro ao criar usuário: ' + error.message);
    }
}

// Função para criar um novo livro
export async function createLivro(data) {
    const { Titulo, Autor, Ano_Publicacao } = data;
    if (!Titulo || !Autor || !Ano_Publicacao) {
        throw new Error('Título, autor e ano de publicação são obrigatórios.');
    }

    const disponivel = data.Disponivel !== undefined ? data.Disponivel : 1;

    try {
        const response = await fetch(`${API_BASE}/livros`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Titulo,
                Autor,
                Ano_Publicacao,
                Disponivel: disponivel,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Falha ao criar livro: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao criar livro:', error);
        throw new Error(`Erro ao criar livro: ${error.message}`);
    }
}

// Função para registrar o empréstimo de um livro
export async function emprestarLivro(data) {
    try {
        const response = await fetch(`${API_BASE}/emprestimos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Falha ao realizar empréstimo: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao realizar empréstimo:', error);
        throw new Error(`Erro ao realizar empréstimo: ${error.message}`);
    }
}

// Função para listar os empréstimos ativos
export async function fetchReservasAtivas() {
    try {
      const response = await fetch(`${API_BASE}/emprestimos`);
      if (!response.ok) {
        throw new Error('Falha ao buscar reservas ativas.');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar reservas ativas:', error);
      throw new Error(error.message);
    }
  }

// Função para registrar a devolução de um livro
export async function devolverLivro(id) {
    try {
        const response = await fetch(`${API_BASE}/emprestimos/${id}`, {
            method: 'PUT',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Falha ao devolver livro: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao devolver livro:', error);
        throw new Error(`Erro ao devolver livro: ${error.message}`);
    }
}

// src/services/api.js

// Função para buscar as avaliações
export const fetchAvaliacoes = async () => {
    const response = await fetch('http://localhost:5000/avaliacoes');
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Erro ao buscar avaliações');
    }
};

// Função para cadastrar uma nova avaliação
export const postAvaliacao = async (avaliacaoData) => {
    const response = await fetch('http://localhost:5000/avaliacoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(avaliacaoData),
    });
    if (!response.ok) {
        throw new Error('Erro ao cadastrar avaliação');
    }
};


