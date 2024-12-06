import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaBook, FaClipboardList, FaRegCalendarPlus, FaStar } from 'react-icons/fa'; // Importando o ícone de avaliações
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-menu">
        <ul className="menu-list">
          <li>
            <Link to="/" className="menu-item">
              <FaHome className="menu-icon" aria-hidden="true" />
              <span>Home</span>
            </Link>
          </li>
          
          <li className="menu-item dropdown">
            <span className="dropdown-title">
              <FaUsers className="menu-icon" aria-hidden="true" />
              <span>Usuários</span>
            </span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/usuarios" className="dropdown-item">Lista de Usuários</Link>
              </li>
              <li>
                <Link to="/criar-usuario" className="dropdown-item">Cadastrar Usuário</Link>
              </li>
            </ul>
          </li>

          <li className="menu-item dropdown">
            <span className="dropdown-title">
              <FaBook className="menu-icon" aria-hidden="true" />
              <span>Livros</span>
            </span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/livros" className="dropdown-item">Lista de Livros</Link>
              </li>
              <li>
                <Link to="/criar-livro" className="dropdown-item">Cadastrar Livro</Link>
              </li>
            </ul>
          </li>

          <li className="menu-item dropdown">
            <span className="dropdown-title">
              <FaRegCalendarPlus className="menu-icon" aria-hidden="true" />
              <span>Reservas</span>
            </span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/emprestimos" className="dropdown-item">Lista de Reservas</Link>
              </li>
              <li>
                <Link to="/biblioteca" className="dropdown-item">Cadastrar Reserva</Link>
              </li>
            </ul>
          </li>

          <li className="menu-item dropdown">
            <span className="dropdown-title">
              <FaStar className="menu-icon" aria-hidden="true" />
              <span>Avaliações</span>
            </span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/avaliacoes" className="dropdown-item">Lista de Avaliações</Link>
              </li>
              <li>
                <Link to="/criar-avaliacao" className="dropdown-item">Cadastrar Avaliação</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
