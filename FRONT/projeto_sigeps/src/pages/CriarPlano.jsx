import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addPlano, getRecursos, addAtividade, addPlanoRecurso, deleteAtividade } from '../service/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTrash } from 'react-icons/fa';

const CriarPlano = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const id_chamado = id;

  const [nomePlano, setNomePlano] = useState('');
  const [descricaoPlano, setDescricaoPlano] = useState('');
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [statusPlano, setStatusPlano] = useState('Ativo');
  const [atividades, setAtividades] = useState([]);
  const [novaAtividade, setNovaAtividade] = useState({ descricao_atividade: '', inicio_atividade: null, fim_atividade: null, status_atividade: 'Ativo', id_plano: null });
  const [recursos, setRecursos] = useState([]);
  const [recursosSelecionados, setRecursosSelecionados] = useState([]);
  const [idPlanoCriado, setIdPlanoCriado] = useState(null);
  const [planoCriado, setPlanoCriado] = useState(false); // Flag para verificar se o plano foi criado

  useEffect(() => {
    fetchRecursos();
  }, []);

  const fetchRecursos = async () => {
    try {
      const data = await getRecursos();
      setRecursos(data.map(recurso => ({ ...recurso, quantidadeReservada: 0 })));
    } catch (error) {
      console.error('Erro ao buscar recursos', error);
    }
  };

  useEffect(() => {
    if (idPlanoCriado !== null) {
        console.log('id do plano atualizado: ', idPlanoCriado);
    }
}, [idPlanoCriado]); // O efeito só será chamado quando idPlanoCriado mudar


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const novoPlano = {
        nome_plano: nomePlano,
        descricao_plano: descricaoPlano,
        data_inicio: dataInicio.toISOString().split('T')[0],
        data_fim: dataFim.toISOString().split('T')[0],
        status_plano: statusPlano,
        id_chamado,
      };

      const planoCriado = await addPlano(novoPlano);
      console.log('Resposta da API ao criar o plano: ', planoCriado);
      setIdPlanoCriado(planoCriado.id);
      setPlanoCriado(true); // Define que o plano foi criado
      alert('Plano criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar o plano:', error);
      alert('Erro ao criar o plano.');
    }
  };

  const handleAddAtividade = async () => {
    if (novaAtividade.descricao_atividade && novaAtividade.inicio_atividade && novaAtividade.fim_atividade) {
      try {

        // Adiciona a nova atividade ao banco
        const atividadeCadastrada = await addAtividade({
          ...novaAtividade,
          status_atividade: 'Ativo',
          id_plano: idPlanoCriado,
        });
  
        // Atualiza o estado com a nova atividade
        setAtividades([...atividades, atividadeCadastrada]);
  
        // Limpa o formulário após adicionar
        setNovaAtividade({ descricao_atividade: '', inicio_atividade: '', fim_atividade: '', status_atividade: '', id_plano: ''});
      } catch (error) {
        console.error("Erro ao adicionar atividade", error);
      }
    }
  };
  

  const handleDeleteAtividade = async (idAtividade) => {
    try {
      const response = await deleteAtividade(idAtividade);
      console.log('Atividade deletada:', response);  // Verifique a resposta da API
      
      // Atualiza o estado removendo a atividade
      setAtividades(atividades.filter((atividade) => atividade.id !== idAtividade));
    } catch (error) {
      console.error('Erro ao deletar atividade', error);
    }
  };
  
  

  const handleRecursoSelecionado = (index, quantidade) => {
    const novosRecursos = [...recursos];
    novosRecursos[index].quantidadeReservada = quantidade;
    setRecursos(novosRecursos);
    setRecursosSelecionados(novosRecursos.filter(recurso => recurso.quantidadeReservada > 0));
  };

  const handleFinalizarPlanejamento = async () => {
    try {
      
      await Promise.all(
        recursosSelecionados.map(async recurso => {
          if (recurso.quantidadeReservada > 0) {
            await addPlanoRecurso({
              id_plano: idPlanoCriado,
              id_recurso: recurso.id_recurso,
            });
          }
        })
      );

      alert('Atividades e recursos registrados com sucesso!');
      navigate('/listaplanos');
    } catch (error) {
      console.error('Erro ao registrar atividades e recursos:', error);
      alert('Erro ao registrar atividades e recursos.');
    }
  };

  return (
    <div className="page-container">

      {/* Adicionar atividades antes de criar o plano */}
      {planoCriado && (
        <div className="sidetoside">
          <h2>Adicionar Atividade</h2>
          <div className="info-box">
            Adicione atividades à lista de atividades antes de criar o plano.
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Descrição da Atividade:</label>
              <input
                type="text"
                value={novaAtividade.descricao_atividade}
                onChange={(e) => setNovaAtividade({ ...novaAtividade, descricao_atividade: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Data de Início:</label>
              <DatePicker
                selected={novaAtividade.inicio_atividade}
                onChange={(date) => setNovaAtividade({ ...novaAtividade, inicio_atividade: date.toISOString().split('T')[0] })}
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>
            <div>
              <label>Data de Fim:</label>
              <DatePicker
                selected={novaAtividade.fim_atividade}
                onChange={(date) => setNovaAtividade({ ...novaAtividade, fim_atividade: date.toISOString().split('T')[0] })}
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>
            <button type="button" onClick={handleAddAtividade}>
              Adicionar Atividade
            </button>
          </form>
        </div>
      )}



      {/* Lista de atividades */}
      {planoCriado && (
        <div className="sidetoside">
          <h3>Lista de Atividades</h3>
          <ul>
            {atividades.map((atividade, index) => (
              <li key={atividade.id}>
                <strong>Descrição:</strong> {atividade.descricao_atividade} | 
                <strong> Início:</strong> {atividade.inicio_atividade} | 
                <strong> Fim:</strong> {atividade.fim_atividade}
                <button onClick={() => handleDeleteAtividade(atividade.id)} style={{ color: 'white' }}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}



      {/* Dados do plano */}
      {!planoCriado && (
        <div className="sidetoside">
          <h2>Dados do Plano</h2>
          {id_chamado && (
        <div className="info-box">
          <p>Plano será associado ao chamado ID: {id_chamado}</p>
        </div>
      )}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nome do Plano:</label>
              <input
                type="text"
                value={nomePlano}
                onChange={(e) => setNomePlano(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Descrição:</label>
              <textarea
                value={descricaoPlano}
                onChange={(e) => setDescricaoPlano(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Data de Início:</label>
              <DatePicker
                selected={dataInicio}
                onChange={(date) => setDataInicio(date)}
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>
            <div>
              <label>Data de Fim:</label>
              <DatePicker
                selected={dataFim}
                onChange={(date) => setDataFim(date)}
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>
            <button type="submit">Criar Plano</button>
          </form>
        </div>
      )}

      {/* Seleção de recursos */}
      {planoCriado && (
        <div className="sidetoside">
          <h2>Recursos Disponíveis</h2>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Estoque</th>
                <th>Reservar</th>
              </tr>
            </thead>
            <tbody>
              {recursos.length > 0 ? (
                recursos.map((recurso, index) => (
                  <tr key={recurso.id_recurso}>
                    <td>{recurso.nome_recurso}</td>
                    <td>{recurso.quantidade_disponivel}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max={recurso.quantidade_disponivel}
                        value={recurso.quantidadeReservada}
                        onChange={(e) => handleRecursoSelecionado(index, Number(e.target.value))}
                        disabled={!planoCriado} // Inputs desabilitados até o plano ser criado
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Nenhum recurso encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Mostrar o botão apenas quando o plano for criado */}
          <button onClick={handleFinalizarPlanejamento} disabled={!planoCriado}>
            Finalizar Planejamento
          </button>
        </div>
      )}
    </div>
  );
};

export default CriarPlano;
