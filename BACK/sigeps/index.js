const express = require('express');
const cors = require('cors');
const { registerUser, loginUser } = require('./authService');

const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Importar as rotas corretamente
const usuarioRoutes = require('./routes/usuario');
const sistemaRoutes = require('./routes/sistema');
const chamadoRoutes = require('./routes/chamado');
const planoRoutes = require('./routes/plano');
const especialidadeRoutes = require('./routes/especialidade');
const cronogramaRoutes = require('./routes/cronograma');
const atividadeRoutes = require('./routes/atividade');
const recursoRoutes = require('./routes/recurso');
const planoRecursoRoutes = require('./routes/plano_recurso');

// Usar as rotas corretamente

app.use('/usuario', usuarioRoutes);
app.use('/sistema', sistemaRoutes);
app.use('/chamado', chamadoRoutes);
app.use('/plano', planoRoutes);
app.use('/especialidade', especialidadeRoutes);
app.use('/cronograma', cronogramaRoutes);
app.use('/atividade', atividadeRoutes);
app.use('/recurso', recursoRoutes);
app.use('/plano_recurso', planoRecursoRoutes);

/*
app.use('/api/usuario', usuarioRoutes);
app.use('/api/sistema', sistemaRoutes);
app.use('/api/chamado', chamadoRoutes);
app.use('/api/plano', planoRoutes);
app.use('/api/especialidade', especialidadeRoutes);
app.use('/api/cronograma', cronogramaRoutes);
app.use('/api/atividade', atividadeRoutes);
app.use('/api/recurso', recursoRoutes);
*/

// Iniciar o servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Rota para registro de usuário
app.post('/registro', async (req, res) => {
  const { idToken } = req.body; // O idToken deve ser enviado pelo frontend

    try {
        const user = await registerUserWithGoogle(idToken);
        res.status(201).send({ message: 'Usuário registrado com sucesso', user });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Rota para login de usuário
app.post('/login', async (req, res) => {
  const { email_usuario, password } = req.body;

  try {
      const user = await loginUser(email_usuario, password);
      res.status(200).send({ message: 'Login bem-sucedido', user });
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
});
