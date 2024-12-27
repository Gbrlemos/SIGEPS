import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Logo "Sigeps" no canto esquerdo */}
      <div className="logo">
        <div className='logo'>
        <img src="/images/SigepsIcon.png" alt="Sigeps Icon" className="navbar-icon" />
          Sigeps
        </div>
      </div>
      
      {/* Links de Login e Cadastrar no canto direito */}
      <div className="auth-buttons">
        <a href="/login">Login</a>
        <a href="/cadastrarusuario">Cadastrar</a>
      </div>
    </div>
  );
};

export default Navbar;
