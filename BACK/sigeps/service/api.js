import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const getApiUrl = (resource) => `${BASE_URL}/${resource}`;

// Função genérica para obter todos os recursos
const getAll = async (resource) => {
    try {
        const response = await axios.get(getApiUrl(resource));
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar ${resource}:`, error);
        throw error;
    }
};

// Função genérica para adicionar um novo recurso
const add = async (resource, data) => {
    try {
        const response = await axios.post(getApiUrl(resource), data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao adicionar ${resource}:`, error);
        throw new Error(`Falha ao adicionar ${resource}: ${error.response ? error.response.data : error.message}`);
    }
};


// Função genérica para atualizar um recurso
const update = async (resource, id, data) => {
    try {
        const response = await axios.put(`${getApiUrl(resource)}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar ${resource}:`, error);
        throw error;
    }
};

// Função genérica para deletar um recurso
const remove = async (resource, id) => {
    try {
        const response = await axios.delete(`${getApiUrl(resource)}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao remover ${resource}:`, error);
        throw error;
    }
};

// Funções específicas para cada recurso usando as funções genéricas
export const getUsuarios = () => getAll('usuario');
export const addUsuario = (usuario) => add('usuario', usuario);
export const updateUsuario = (idusuario, usuario) => update('usuario', idusuario, usuario);
export const deleteUsuario = (idusuario) => remove('usuario', idusuario);

export const getSistemas = () => getAll('sistema');
export const addSistema = (sistema) => add('sistema', sistema);
export const updateSistema = (idsistema, sistema) => update('sistema', idsistema, sistema);
export const deleteSistema = (idsistema) => remove('sistema', idsistema);

export const getChamados = () => getAll('chamado');
export const addChamado = (chamado) => add('chamado', chamado);
export const updateChamado = (idchamado, chamado) => update('chamado', idchamado, chamado);
export const deleteChamado = (idchamado) => remove('chamado', idchamado);

export const getAtividades = () => getAll('atividade');
export const addAtividade = (atividade) => add('atividade', atividade);
export const updateAtividade = (idatividade, atividade) => update('atividade', idatividade, atividade);
export const deleteAtividade = (idatividade) => remove('atividade', idatividade);

export const getCronogramas = () => getAll('cronograma');
export const addCronograma = (cronograma) => add('cronograma', cronograma);
export const updateCronograma = (idcronograma, cronograma) => update('cronograma', idcronograma, cronograma);
export const deleteCronograma = (idcronograma) => remove('cronograma', idcronograma);

export const getEspecialidades = () => getAll('especialidade');
export const addEspecialidade = (especialidade) => add('especialidade', especialidade);
export const updateEspecialidade = (idespecialidade, especialidade) => update('especialidade', idespecialidade, especialidade);
export const deleteEspecialidade = (idespecialidade) => remove('especialidade', idespecialidade);

export const getPlanos = () => getAll('plano');
export const addPlano = (plano) => add('plano', plano);
export const updatePlano = (idplano, plano) => update('plano', idplano, plano);
export const deletePlano = (idplano) => remove('plano', idplano);

export const getRecursos = () => getAll('recurso');
export const addRecurso = (recurso) => add('recurso', recurso);
export const updateRecurso = (idrecurso, recurso) => update('recurso', idrecurso, recurso);
export const deleteRecurso = (idrecurso) => remove('recurso', idrecurso);

export const getPlanoRecursos = () => getAll('plano_recurso');
export const addPlanoRecurso = (plano_recurso) => add('plano_recurso', plano_recurso);
export const updatePlanoRecurso = (id_planorecurso, plano_recurso) => update('plano_recurso', id_planorecurso, plano_recurso);
export const deletePlanoRecurso = (id_planorecurso) => remove('plano_recurso', id_planorecurso);
export const getRecursosByPlano = async (idPlano) => {
    try {
      const response = await axios.get(`/api/plano_recurso/planos/${idPlano}/recursos`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar recursos do plano:", error);
      throw error;
    }
  };
  