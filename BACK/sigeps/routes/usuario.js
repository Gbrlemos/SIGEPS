// routes/usuario.js
const express = require('express');
const router = express.Router();
const pool = require('../banco/bd');

// GET - Todos os usuários
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuario');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE idusuario = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Criar novo usuário
router.post('/', async (req, res) => {
  const { nome_usuario, cpf_usuario, email_usuario, login_usuario, senha_usuario, tipo_usuario } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO usuario (nome_usuario, cpf_usuario, email_usuario, login_usuario, senha_usuario, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)',
      [nome_usuario, cpf_usuario, email_usuario, login_usuario, senha_usuario, tipo_usuario]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Atualizar usuário
router.put('/:id', async (req, res) => {
  const { nome_usuario, cpf_usuario, email_usuario, login_usuario, senha_usuario, tipo_usuario } = req.body;
  try {
    await pool.query(
      'UPDATE usuario SET nome_usuario = ?, cpf_usuario = ?, email_usuario = ?, login_usuario = ?, senha_usuario = ?, tipo_usuario = ? WHERE idusuario = ?',
      [nome_usuario, cpf_usuario, email_usuario, login_usuario, senha_usuario, tipo_usuario, req.params.id]
    );
    res.json({ message: 'Usuário atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Deletar usuário
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM usuario WHERE idusuario = ?', [req.params.id]);
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
