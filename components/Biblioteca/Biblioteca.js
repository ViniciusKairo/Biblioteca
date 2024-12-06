import React, { useState, useEffect } from "react";
import { fetchUsuarios, emprestarLivro, devolverLivro } from "../../services/api";
import "./Biblioteca.css";

// Componente para mensagens de status
const Mensagem = ({ texto, tipo }) => {
  if (!texto) return null;
  return <p className={tipo}>{texto}</p>;
};

// Formulário de empréstimo (reserva)
const FormularioEmprestimo = ({ usuarios, onEmprestar, mensagem }) => {
  const [emprestimoData, setEmprestimoData] = useState({
    id_usuario: "",
    id_livro: "",
    data_retirada: "",
    data_devolucao: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onEmprestar(emprestimoData);
    setEmprestimoData({
      id_usuario: "",
      id_livro: "",
      data_retirada: "",
      data_devolucao: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Realizar Reserva</h2>
      <div>
        <label>Nome do Usuário:</label>
        <select
  value={emprestimoData.id_usuario}
  onChange={(e) =>
    setEmprestimoData({ ...emprestimoData, id_usuario: e.target.value })
  }
  required
>
  <option value="" disabled>
    Selecione um usuário
  </option>
  {usuarios.map((usuario) => (
    <option key={usuario.ID_Usuario} value={usuario.ID_Usuario}>
      {usuario.Nome}
    </option>
  ))}
</select>
      </div>
      <div>
        <label>ID do Livro:</label>
        <input
          type="text"
          value={emprestimoData.id_livro}
          onChange={(e) =>
            setEmprestimoData({ ...emprestimoData, id_livro: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label>Data de Retirada:</label>
        <input
          type="date"
          value={emprestimoData.data_retirada}
          onChange={(e) =>
            setEmprestimoData({ ...emprestimoData, data_retirada: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label>Data de Devolução:</label>
        <input
          type="date"
          value={emprestimoData.data_devolucao}
          onChange={(e) =>
            setEmprestimoData({ ...emprestimoData, data_devolucao: e.target.value })
          }
          required
        />
      </div>
      <button type="submit">Reservar Livro</button>
      <Mensagem texto={mensagem} tipo={mensagem.includes("Sucesso") ? "success" : "error"} />
    </form>
  );
};

// Formulário de devolução
const FormularioDevolucao = ({ onDevolver, mensagem }) => {
  const [devolucaoId, setDevolucaoId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onDevolver(devolucaoId);
    setDevolucaoId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Devolução</h2>
      <div>
        <label>ID do Empréstimo:</label>
        <input
          type="text"
          value={devolucaoId}
          onChange={(e) => setDevolucaoId(e.target.value)}
          required
        />
      </div>
      <button type="submit">Devolver Livro</button>
      <Mensagem texto={mensagem} tipo={mensagem.includes("Sucesso") ? "success" : "error"} />
    </form>
  );
};

// Componente principal da biblioteca
const Biblioteca = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [emprestimoMensagem, setEmprestimoMensagem] = useState("");
  const [devolucaoMensagem, setDevolucaoMensagem] = useState("");

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const usuariosData = await fetchUsuarios();
        console.log("Usuários recebidos:", usuariosData);

        // Verificar se a estrutura está correta
        if (usuariosData && Array.isArray(usuariosData)) {
          const usuariosOrdenados = usuariosData.sort((a, b) => {
            // Garantir que 'nome' seja uma string válida
            const nomeA = a.nome || ''; // Se 'nome' for undefined, substitua por uma string vazia
            const nomeB = b.nome || ''; // O mesmo para o outro item
            return nomeA.localeCompare(nomeB);
          });
          setUsuarios(usuariosOrdenados);
        } else {
          console.error("Dados de usuários inválidos");
        }
      } catch (error) {
        console.error("Erro ao carregar usuários:", error.message);
      }
    };

    carregarUsuarios();
  }, []);

  const handleEmprestarLivro = async (dados) => {
    try {
      const response = await emprestarLivro(dados);
      setEmprestimoMensagem(`Sucesso: ${response.message}`);
    } catch (error) {
      setEmprestimoMensagem(`Erro: ${error.message}`);
    }
  };

  const handleDevolucaoLivro = async (id) => {
    try {
      const response = await devolverLivro(id);
      setDevolucaoMensagem(`Sucesso: ${response.message}`);
    } catch (error) {
      setDevolucaoMensagem(`Erro: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Gestão de Reservas e Devoluções</h1>
      <FormularioEmprestimo
        usuarios={usuarios}
        onEmprestar={handleEmprestarLivro}
        mensagem={emprestimoMensagem}
      />
      <FormularioDevolucao
        onDevolver={handleDevolucaoLivro}
        mensagem={devolucaoMensagem}
      />
    </div>
  );
};

export default Biblioteca;
