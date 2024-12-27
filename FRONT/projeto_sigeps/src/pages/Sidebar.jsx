import React from 'react';
import { Link } from 'react-router-dom'; // Importando Link para navegação

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/home" className="sidebar-btn">
        <i className="fas fa-home"></i>
        <span>Página Principal</span>
      </Link>

      <Link to="/developers" className="sidebar-btn">
        <i className="fas fa-laptop-code"></i>
        <span>Desenvolvedores</span>
      </Link>

      <Link to="/criarchamado" className="sidebar-btn">
        <i className="fas fa-plus-circle"></i>
        <span>Criar Chamado</span>
      </Link>

      <Link to="/listachamados" className="sidebar-btn">
        <i className="fas fa-list"></i>
        <span>Lista de Chamados</span>
      </Link>

      <Link to="/listaplanos" className="sidebar-btn"> {/* Nova opção no sidebar */}
        <i className="fas fa-clipboard-list"></i> {/* Ícone de lista ou algo relacionado */}
        <span>Lista de Planos</span>
      </Link>

      <Link to="/cadastrarsistema" className="sidebar-btn">
        <i className="fas fa-server"></i>
        <span>Cadastrar Sistema</span>
      </Link>

      <Link to="/criarplano" className="sidebar-btn">
        <i className="fas fa-tasks"></i>
        <span>Criar Plano</span>
      </Link>

      <Link to="/cadastrarrecurso" className="sidebar-btn">
        <i className="fas fa-boxes"></i>
        <span>Cadastrar Recurso</span>
      </Link>
    </div>
  );
};

export default Sidebar;
