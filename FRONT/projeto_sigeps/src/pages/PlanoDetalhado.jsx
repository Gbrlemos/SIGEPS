import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlanos, getAtividades, getPlanoRecursos, getRecursos } from '../service/api'; 

const PlanoDetalhado = () => {
  const { idPlano } = useParams(); // Obtém o ID do plano da URL
  const [plano, setPlano] = useState(null);
  const [atividades, setAtividades] = useState([]);
  const [planoRecursos, setPlanoRecursos] = useState([]);
  const [recursos, setRecursos] = useState([]);
  const navigate = useNavigate();

  // Função para buscar os detalhes do plano
  useEffect(() => {
    const fetchPlanoDetalhado = async () => {
      try {
        // Buscar o plano específico
        const planos = await getPlanos();
        console.log('Planos encontrados: ', planos);
        const planoSelecionado = planos.find(
          (plano) => plano.id_plano === parseInt(idPlano)
        );
        console.log('idPlano: ', idPlano);
        console.log('Plano selecionado: ', planoSelecionado);

        if (planoSelecionado) {
          setPlano(planoSelecionado);
        } else {
          console.error('Plano não encontrado!');
          navigate('/'); // Redireciona se o plano não for encontrado
        }

        // Buscar as atividades relacionadas ao plano
        const atividadesData = await getAtividades();
        const atividadesFiltradas = atividadesData.filter(
          (atividade) => atividade.id_plano === parseInt(idPlano)
        );
        setAtividades(atividadesFiltradas);

        // Buscar os recursos vinculados ao plano via plano_recurso
        const planoRecursoData = await getPlanoRecursos(idPlano);
        setPlanoRecursos(planoRecursoData); // Adiciona os plano_recurso retornados

        // Busca todos os recursos para apresentar depois pelo id_planorecurso
        const recursosData = await getRecursos();
        setRecursos(recursosData); // Adiciona os recursos retornados
      } catch (error) {
        console.error('Erro ao buscar detalhes do plano:', error);
      }


    };

    fetchPlanoDetalhado();
  }, [idPlano, navigate]);

  return (
    <div className="container">
      <h1>Detalhes do Plano</h1>
      {plano ? (
        <><div className="plano-detalhes">
          <h2>{plano.nome_plano}</h2>
          <p>
            <strong>Status:</strong> {plano.status_plano}
          </p>
          <p>
            <strong>Descrição:</strong> {plano.descricao_plano}
          </p>
          <p>
            <strong>Data de Criação:</strong>{' '}
            {new Date(plano.data_criacao_plano).toLocaleDateString()}
          </p>
          <p>
            <strong>Período:</strong> {' '}
            {new Date(plano.data_inicio).toLocaleDateString()}
            <strong> à</strong> {' '}
            {new Date(plano.data_fim).toLocaleDateString()}
          </p>
        </div>
        <div className="plano-detalhes">
            <h3>Atividades</h3>
            {atividades.length > 0 ? (
              <ul>
                {atividades.map((atividade) => (
                  <li key={atividade.id_atividade}>
                    {atividade.descricao_atividade} - {atividade.status_atividade}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Não há atividades vinculadas a este plano.</p>
            )}
        </div>
        <div className='plano-detalhes'>      
        <h3>Recursos</h3>
          {planoRecursos.length > 0 ? (
            <ul>
              {planoRecursos.map((planoRecurso) => {
                // Encontre o recurso correspondente pelo ID
                const recursoDetalhado = recursos.find(
                  (recurso) => recurso.id_recurso === planoRecurso.id_recurso
                );

                // Exiba os detalhes apenas se o recurso foi encontrado
                if (recursoDetalhado) {
                  return (
                    <li key={planoRecurso.id_planorecurso}>
                      {recursoDetalhado.nome_recurso} - {recursoDetalhado.quantidade_disponivel} disponível(is)
                    </li>
                  );
                } else {
                  return (
                    <li key={planoRecurso.id_planorecurso}>
                      Recurso não encontrado para este plano.
                    </li>
                  );
                }
              })}
              </ul>
            ) : (
              <p>Não há recursos vinculados a este plano.</p>
            )}
          </div></>
      ) : (
        <p>Carregando detalhes do plano...</p>
      )}
    </div>
  );
};

export default PlanoDetalhado;
