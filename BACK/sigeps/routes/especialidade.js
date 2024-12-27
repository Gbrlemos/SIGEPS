// routes/atividade.js
const express = require('express');
const router = express.Router();
const pool = require('../banco/bd');

// GET - Todos os usuários
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM especialidade ');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM  especialidade   WHERE idespecialidade  = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Especialidade não encontrada' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Criar novo usuário
router.post('/', async (req, res) => {
  const { nome_especialidade  , descricao_especialidade } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO especialidade   (nome_especialidade  , descricao_especialidade ) VALUES (?, ?)',
      [nome_especialidade  , descricao_especialidade ]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Atualizar usuário
router.put('/:id', async (req, res) => {
  const { nome_especialidade  , descricao_especialidade } = req.body;
  try {
    await pool.query(
      'UPDATE especialidade  SET nome_especialidade   = ?, descricao_especialidade   = ? WHERE idespecialidade   = ?',
      [nome_especialidade  , descricao_especialidade ,  req.params.id]
    );
    res.json({ message: 'Especialidade atualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Deletar usuário
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM especialidade  WHERE idespecialidade   = ?', [req.params.id]);
    res.json({ message: 'Especialidade deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
