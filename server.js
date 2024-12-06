const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa o CORS
const fs = require('fs'); // Módulo para manipulação de arquivos

const app = express();
const port = 3000;

// Middleware para permitir CORS de qualquer origem
app.use(cors()); // Ou, para uma origem específica: app.use(cors({ origin: 'http://localhost:3001' }));

// Middleware para processar JSON
app.use(bodyParser.json());

// Configuração do banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'biblioteca',
};

// Função auxiliar para conexão ao banco de dados
async function connectToDatabase() {
    return mysql.createConnection(dbConfig);
}

// Função para fechar a conexão
async function closeConnection(connection) {
    try {
        await connection.end();
    } catch (error) {
        console.error('Erro ao fechar a conexão com o banco de dados:', error);
    }
}

// Função para gravar empréstimos no arquivo txt
async function backupEmprestimo(emprestimoData) {
    const data = `${emprestimoData.id_usuario}, ${emprestimoData.id_livro}, ${emprestimoData.data_retirada}, ${emprestimoData.data_devolucao}\n`;
    
    fs.appendFile('emprestimos_backup.txt', data, (err) => {
        if (err) {
            console.error('Erro ao salvar backup no arquivo:', err);
        } else {
            console.log('Backup de empréstimo salvo com sucesso!');
        }
    });
}


// Rotas

// Criar usuário
app.post('/usuarios', async (req, res) => {
    const { nome, email, telefone } = req.body;

    // Validação dos dados de entrada
    if (!nome || !email || !telefone) {
        return res.status(400).json({ message: 'Nome, email e telefone são obrigatórios.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email inválido.' });
    }

    let connection;
    try {
        connection = await connectToDatabase();

        // Verificar se o e-mail ou telefone já estão cadastrados
        const checkUserQuery = 'SELECT * FROM Usuarios WHERE Email = ? OR Telefone = ?';
        const [existingUser] = await connection.execute(checkUserQuery, [email, telefone]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email ou telefone já cadastrados.' });
        }

        // Inserir novo usuário
        const query = 'INSERT INTO Usuarios (Nome, Email, Telefone) VALUES (?, ?, ?)';
        const [result] = await connection.execute(query, [nome, email, telefone]);

        res.status(201).json({
            message: 'Usuário criado com sucesso!',
            userId: result.insertId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar usuário.' });
    } finally {
        if (connection) {
            await closeConnection(connection);
        }
    }
});

// Adicionar livro
app.post('/livros', async (req, res) => {
    // Mapeando os dados do corpo da requisição
    const { Titulo, Autor, Ano_Publicacao, Disponivel } = req.body;

    // Validação dos dados de entrada
    if (!Titulo || !Autor || !Ano_Publicacao) {
        return res.status(400).json({ message: 'Título, autor e ano de publicação são obrigatórios.' });
    }

    // Definindo disponibilidade com valor padrão (1) se não fornecido
    const disponibilidade = Disponivel !== undefined ? Disponivel : 1;

    let connection;
    try {
        connection = await connectToDatabase();

        // Inserindo o livro no banco de dados
        const query = 'INSERT INTO Livros (Titulo, Autor, Ano_Publicacao, Disponivel) VALUES (?, ?, ?, ?)';
        const [result] = await connection.execute(query, [Titulo, Autor, Ano_Publicacao, disponibilidade]);
        
        res.status(201).json({ message: 'Livro adicionado com sucesso!', livroId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar livro.' });
    } finally {
        if (connection) {
            await closeConnection(connection);
        }
    }
});

// Realizar empréstimo
// Realizar empréstimo
app.post('/emprestimos', async (req, res) => {
    const { id_usuario, id_livro, data_retirada, data_devolucao } = req.body;

    // Validação dos dados de entrada
    if (!id_usuario || !id_livro || !data_retirada || !data_devolucao) {
        return res.status(400).json({ message: 'ID do usuário, ID do livro, data de retirada e data de devolução são obrigatórios.' });
    }

    let connection;
    try {
        connection = await connectToDatabase();

        // Verificar se o livro está disponível para empréstimo
        const checkAvailability = 'SELECT Disponivel FROM Livros WHERE ID_Livro = ?';
        const [rows] = await connection.execute(checkAvailability, [id_livro]);

        if (rows.length === 0 || !rows[0].Disponivel) {
            return res.status(400).json({ message: 'Livro não disponível para empréstimo.' });
        }

        // Realizar empréstimo
        const query = `INSERT INTO Emprestimos (ID_Usuario, ID_Livro, Data_Retirada, Data_Devolucao) VALUES (?, ?, ?, ?)`;
        const updateBook = 'UPDATE Livros SET Disponivel = FALSE WHERE ID_Livro = ?';
        await connection.execute(query, [id_usuario, id_livro, data_retirada, data_devolucao]);
        await connection.execute(updateBook, [id_livro]);

        // Salvar o empréstimo no arquivo de backup
        await backupEmprestimo({ id_usuario, id_livro, data_retirada, data_devolucao });

        res.status(201).json({ message: 'Empréstimo realizado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao realizar empréstimo.' });
    } finally {
        if (connection) {
            await closeConnection(connection);
        }
    }
});


// Retornar livro
app.put('/emprestimos/:id', async (req, res) => {
    const { id } = req.params;

    let connection;
    try {
        connection = await connectToDatabase();

        // Verificar se o empréstimo existe
        const query = 'SELECT ID_Livro FROM Emprestimos WHERE ID_Emprestimo = ?';
        const [rows] = await connection.execute(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }

        const idLivro = rows[0].ID_Livro;

        // Devolver o livro e excluir o empréstimo
        const updateBook = 'UPDATE Livros SET Disponivel = TRUE WHERE ID_Livro = ?';
        const deleteLoan = 'DELETE FROM Emprestimos WHERE ID_Emprestimo = ?';
        await connection.execute(updateBook, [idLivro]);
        await connection.execute(deleteLoan, [id]);

        res.status(200).json({ message: 'Livro devolvido com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao devolver livro.' });
    } finally {
        if (connection) {
            await closeConnection(connection);
        }
    }
});

// Listar todos os usuários
app.get('/usuarios', async (req, res) => {
    let connection;
    try {
        connection = await connectToDatabase();
        const query = 'SELECT * FROM Usuarios';
        const [rows] = await connection.execute(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar usuários.' });
    } finally {
        if (connection) {
            await closeConnection(connection);
        }
    }
});

// Listar todos os livros
app.get('/livros', async (req, res) => {
    let connection;
    try {
        connection = await connectToDatabase();
        const query = 'SELECT * FROM Livros';
        const [rows] = await connection.execute(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar livros.' });
    } finally {
        if (connection) {
            await closeConnection(connection);
        }
    }
});

app.get('/emprestimos', async (req, res) => {
    try {
        const connection = await connectToDatabase();
        const query = `
            SELECT 
                e.ID_Emprestimo, 
                u.Nome AS Nome_Usuario, 
                l.Titulo AS Titulo_Livro, 
                e.Data_Retirada, 
                e.Data_Devolucao
            FROM Emprestimos e
            INNER JOIN Usuarios u ON e.ID_Usuario = u.ID_Usuario
            INNER JOIN Livros l ON e.ID_Livro = l.ID_Livro
            ORDER BY e.Data_Retirada DESC
        `;
        const [rows] = await connection.execute(query);
        await connection.end();
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar empréstimos.' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
