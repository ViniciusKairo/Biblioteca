// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';  // Importando as rotas
import Header from './components/Header';    // Importando o cabeçalho

const App = () => {
  return (
    <Router>
      <Header />  {/* Exibindo o cabeçalho com o menu */}
      <AppRoutes />  {/* As rotas da aplicação */}
    </Router>
  );
};

export default App;