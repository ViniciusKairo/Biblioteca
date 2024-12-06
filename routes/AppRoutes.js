import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/HomePage';
import Usuarios from '../components/Usuarios';
import Livros from '../components/Livros';
import CriarUsuario from '../pages/Usuarios/CriarUsuario';
import CriarLivro from '../pages/Livros/CriarLivro';
import Biblioteca from '../components/Biblioteca/Biblioteca'; // Importe o componente de Biblioteca
import Emprestimos from '../components/Biblioteca/Emprestimos';
import ListarAvaliacoes from '../components/Avaliacoes/ListarAvaliacoes'; // Importando o componente de Listar Avaliações
import CadastrarAvaliacao from '../components/Avaliacoes/CadastrarAvaliacao'; // Importando o componente de Cadastrar Avaliação

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/livros" element={<Livros />} />
      <Route path="/criar-usuario" element={<CriarUsuario />} />
      <Route path="/criar-livro" element={<CriarLivro />} />
      <Route path="/biblioteca" element={<Biblioteca />} /> {/* Nova rota */}
      <Route path="/emprestimos" element={<Emprestimos />} />
      
      {/* Adicionando as rotas de Avaliações */}
      <Route path="/avaliacoes" element={<ListarAvaliacoes />} /> {/* Rota para listar avaliações */}
      <Route path="/criar-avaliacao" element={<CadastrarAvaliacao />} /> {/* Rota para cadastrar avaliação */}
    </Routes>
  );
};

export default AppRoutes;
