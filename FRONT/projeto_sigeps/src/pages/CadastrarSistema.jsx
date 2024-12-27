import React, { useState, useEffect } from 'react';
import { addSistema, getSistemas } from '../service/api'; // Certifique-se de que as funções estão corretas

const CadastrarSistema = () => {
  // Estado para armazenar o novo sistema
  const [novoSistema, setNovoSistema] = useState({
    nome_sistema: '',
    tipo_sistema: '',
  });

  // Estado para armazenar a lista de sistemas
  const [sistemas, setSistemas] = useState([]);

  // Função para buscar sistemas da API
  useEffect(() => {
    const fetchSistemas = async () => {
      try {
        const data = await getSistemas(); // Busca os sistemas cadastrados
        setSistemas(data);
        console.log('Sistemas recebidos:', data);
      } catch (error) {
        console.error('Erro ao buscar sistemas:', error);
      }
    };

    fetchSistemas();
  }, []);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do submit
    try {
      // Chama a API para adicionar o sistema
      const sistemaAdicionado = await addSistema(novoSistema);
      console.log('Sistema adicionado:', sistemaAdicionado);

      // Atualiza a lista de sistemas
      setSistemas([...sistemas, sistemaAdicionado]);

      // Limpa o formulário após a submissão
      setNovoSistema({ nome_sistema: '', tipo_sistema: '' });
    } catch (error) {
      console.error('Erro ao adicionar sistema:', error);
    }
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNovoSistema({ ...novoSistema, [name]: value });
  };

  return (
    <div className="container">
      <h1>Cadastrar Novo Sistema</h1>
      {/* Formulário para adicionar novo sistema */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome_sistema">Nome do Sistema:</label>
          <input
            type="text"
            id="nome_sistema"
            name="nome_sistema"
            value={novoSistema.nome_sistema}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="tipo_sistema">Tipo do Sistema:</label>
          <div className="info-box">Ex: Streaming, Bancário, E-commerce...</div>
          <input
            type="text"
            id="tipo_sistema"
            name="tipo_sistema"
            value={novoSistema.tipo_sistema}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Adicionar Sistema</button>
        </div>
      </form>

      <h2>Sistemas Cadastrados</h2>
      {/* Tabela de sistemas cadastrados */}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {sistemas.length > 0 ? (
            sistemas.map((sistema) => (
              <tr key={sistema.id_sistema}>
                <td>{sistema.nome_sistema}</td>
                <td>{sistema.tipo_sistema}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Nenhum sistema encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CadastrarSistema;
