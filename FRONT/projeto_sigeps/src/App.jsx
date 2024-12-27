import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Developers from './pages/Developers';
import Login from './pages/Login'; // Atualizado
import CriarChamado from './pages/CriarChamado'; // Atualizado
import CadastrarSistema from './pages/CadastrarSistema';
import CriarPlano from './pages/CriarPlano';
import CadastrarRecurso from './pages/CadastrarRecurso';
import ListaChamados from './pages/ListaChamados';
import ListaPlanos from './pages/ListaPlanos';
import Sidebar from './pages/Sidebar';
import CadastrarUsuario from './pages/CadastrarUsuario';
import PlanoDetalhado from './pages/PlanoDetalhado';

const App = () => {
  return (
   <div className='app-wrapper'>
    <Router>
      <Navbar />
    <div className='app-body'>
      <Sidebar />
        <div className='app-container'>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrarusuario" element={<CadastrarUsuario />} />
            <Route path="/criarchamado" element={<CriarChamado />} />
            <Route path="/listachamados" element={<ListaChamados />} />
            <Route path="/listaplanos" element={<ListaPlanos />} />
            <Route path="/cadastrarsistema" element={<CadastrarSistema />} />
            <Route path="/criarplano" element={<CriarPlano />} />
            <Route path="/criarplano/:id" element={<CriarPlano />} />
            <Route path="/cadastrarrecurso" element={<CadastrarRecurso />} />
            <Route path="/planodetalhado/:idPlano" element={<PlanoDetalhado />} />
            {/* Outras rotas aqui */}
          </Routes>
        </div>
    </div>
    
    </Router>
   </div>
    
  );
};

export default App;
