const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Conexão com o MongoDB (exemplo para MongoDB local)
mongoose.connect('mongodb://localhost:27017/biblioteca', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => console.error(err));

// Definição do modelo de Avaliacao
const avaliacoesSchema = new mongoose.Schema({
  nota: { type: Number, required: true },
  data: { type: Date, default: Date.now },
  comentario: { type: String, required: true }
});

const Avaliacoes = mongoose.model('Avaliacoes', avaliacoesSchema);

// Rota para buscar as avaliações
app.get('/avaliacoes', async (req, res) => {
  try {
    const avaliacoes = await Avaliacoes.find();  // Busca todas as avaliações
    res.json(avaliacoes);
  } catch (err) {
    res.status(500).send('Erro ao buscar avaliações: ' + err);
  }
});

// Rota para cadastrar uma nova avaliação
app.post('/avaliacoes', async (req, res) => {
  const { nota, comentario } = req.body;

  if (!nota || !comentario) {
    return res.status(400).send('Nota e Comentário são obrigatórios!');
  }

  const novaAvaliacao = new Avaliacoes({
    nota,
    comentario
  });

  try {
    await novaAvaliacao.save();  // Salva a nova avaliação no banco de dados
    res.status(201).json(novaAvaliacao);  // Retorna a avaliação salva
  } catch (err) {
    res.status(500).send('Erro ao salvar avaliação: ' + err);
  }
});

// Iniciar o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
