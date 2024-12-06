import React, { useState, useEffect } from 'react';
import { fetchReservasAtivas } from '../../services/api';


const Emprestimos = () => {
  const [emprestimos, setEmprestimos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarEmprestimos = async () => {
      try {
        const emprestimosDados = await fetchReservasAtivas();
        setEmprestimos(emprestimosDados);

        // Chama a função de backup após carregar os dados
       

      } catch (error) {
        console.error('Erro ao carregar empréstimos:', error);
        setErro('Erro ao carregar empréstimos.');
      } finally {
        setLoading(false);
      }
    };

    carregarEmprestimos();
  }, []);

  return (
    <div className="lista-emprestimos">
      <h1>Lista de Empréstimos Ativos</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : erro ? (
        <p>{erro}</p>
      ) : (
        <ul>
          {emprestimos.map((emprestimo) => (
            <li key={emprestimo.ID_Emprestimo}>
              <strong>ID do Empréstimo:</strong> {emprestimo.ID_Emprestimo} <br />
              <strong>Usuário:</strong> {emprestimo.Nome_Usuario} <br />
              <strong>Livro:</strong> {emprestimo.Titulo_Livro} <br />
              <strong>Retirada:</strong> {new Date(emprestimo.Data_Retirada).toLocaleDateString()} <br />
              <strong>Devolução:</strong> {new Date(emprestimo.Data_Devolucao).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Emprestimos;
