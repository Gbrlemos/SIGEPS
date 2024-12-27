import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate do react-router-dom
import { getUsuarios } from '../service/api'; // Importe a função de busca dos usuários (ou a que você usa no seu projeto)

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para erro
  const navigate = useNavigate(); // Hook para navegação

  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    try {
      // Chama a API para buscar o usuário
      const usuarios = await getUsuarios(); // Supondo que getUsuarios retorne todos os usuários do banco

      // Encontrar o usuário com o nome de usuário e senha informados
      const usuario = usuarios.find((user) => user.login_usuario === username && user.senha_usuario === password);

      if (usuario) {
        // Se o usuário foi encontrado, verifica o tipo de usuário
        if (usuario.tipo_usuario === 'Cliente') {
          navigate('/criarchamado'); // Redireciona para página de Criar Chamado
        } else if (usuario.tipo_usuario === 'Triagem') {
          navigate('/listachamados'); // Redireciona para página de Lista Chamados
        } else {
          navigate('/home'); // Redireciona para uma página de especialista (ou outra página que você decida)
        }
      } else {
        setError('Credenciais inválidas!'); // Caso não encontre o usuário
      }
    } catch (err) {
      console.error('Erro ao autenticar usuário:', err);
      setError('Erro ao autenticar usuário, tente novamente mais tarde.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e); // Chama a função de login ao pressionar Enter
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Usuário</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress} // Adiciona o evento de pressionar tecla
        />
        
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress} // Adiciona o evento de pressionar tecla
        />
        
        <button type="submit">Entrar</button>
        <div className="info-box">
            Ainda não possui uma conta? Cadastre-se aqui.
          </div>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe erro caso haja */}
    </div>
  );
};

export default Login;
