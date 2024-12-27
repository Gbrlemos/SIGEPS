// src/pages/CadastrarRecurso.jsx
import React, { useEffect, useState } from 'react';
import { addRecurso, getRecursos } from '../service/api'; // Certifique-se de ter esta função no seu arquivo api.js
import { useNavigate } from 'react-router-dom';

const CadastrarRecurso = () => {
  const navigate = useNavigate();
  const [recursos, setRecursos] = useState([]);

  // Estados para capturar os dados do recurso
  const [nomeRecurso, setNomeRecurso] = useState('');
  const [quantidadeRecurso, setQuantidadeRecurso] = useState('');

  // Função para buscar os recursos do backend
  const fetchRecursos = async () => {
    try {
        const data = await getRecursos();
        setRecursos(data);
        console.log("Recursos recebidos:", data);
    } catch (error){
        console.error("Erro ao buscar recursos", error);
    }
    };

  // Função para enviar o recurso ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const novoRecurso = {
      nome_recurso: nomeRecurso,
      quantidade_disponivel: quantidadeRecurso,
    };

    try {
      // Chama a função de API para salvar o recurso no backend
      await addRecurso(novoRecurso);
      alert('Recurso cadastrado com sucesso!');
      fetchRecursos();
    } catch (error) {
      console.error('Erro ao cadastrar recurso:', error);
      alert('Erro ao cadastrar recurso.');
    }
  };

  useEffect(() => {
    fetchRecursos();
  }, []);

  return (
    <div className='container'>
        <div className='container'>
      <h2>Cadastrar Novo Recurso</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Recurso:</label>
          <input
            type="text"
            value={nomeRecurso}
            onChange={(e) => setNomeRecurso(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantidade Disponível:</label>
          <input
            type="number"
            value={quantidadeRecurso}
            onChange={(e) => setQuantidadeRecurso(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar Recurso</button>
      </form>
      </div>
      <div className='container'>
          <h2>Recursos Disponíveis</h2>
          <table>
              <thead>
                  <tr>
                      <td>Nome</td>
                      <td>Quantidade</td>
                  </tr>
              </thead>
              <tbody>
                {recursos.length > 0 ? (
                 recursos.map((recurso) => (
                         <tr key={recurso.id_recurso}>
                             <td>{recurso.nome_recurso}</td>
                             <td>{recurso.quantidade_disponivel}</td>
                         </tr>
                      ))
               ) : (
                    <tr>
                    <td colSpan="2">Nenhum chamado encontrado.</td>
                  </tr>
                  )}
              </tbody>
          </table>
          </div>
    </div>
  );
};

export default CadastrarRecurso;
