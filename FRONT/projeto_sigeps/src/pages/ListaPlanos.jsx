import React, { useState, useEffect } from 'react';
import { getPlanos } from '../service/api'; 
import { useNavigate } from 'react-router-dom';

const ListaPlanos = () => {
  const [planos, setPlanos] = useState([]);
  const navigate = useNavigate();

  // Função para buscar planos da API
  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        const data = await getPlanos();
        // Filtrando apenas os planos com status "Ativo"
        const planosAtivos = data.filter(plano => plano.status_plano === 'Ativo');
        setPlanos(planosAtivos);
      } catch (error) {
        console.error("Erro ao buscar planos:", error);
      }
    };

    fetchPlanos();
  }, []);

  // Função para redirecionar para a página de detalhes do plano
  const handleDetalhesPlano = (idPlano) => {
    navigate(`/planodetalhado/${idPlano}`);
  };

  return (
    <div className='container'>
      <h1>Gerenciar Planos</h1>
      <div className='info-box'>
        <h2 style={{ margin: 0 }}>Bem-vindo, Triagem!</h2>
        <p>Esta é a área de planos. Aqui você pode consultar os planos ativos e visualizar seus detalhes.</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Status</th>
            <th>Descrição</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {planos.length > 0 ? (
            planos.map((plano) => (
              <tr key={plano.id_plano}>
                <td>{plano.nome_plano}</td>
                <td>{plano.status_plano}</td>
                <td>{plano.descricao_plano}</td>
                <td>{new Date(plano.data_criacao_plano).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDetalhesPlano(plano.id_plano)}>
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum plano ativo encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPlanos;
