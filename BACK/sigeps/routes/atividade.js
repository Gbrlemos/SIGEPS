// routes/atividade.js
const express = require('express');
const router = express.Router();
const pool = require('../banco/bd');

// GET - Todas as atividades
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM atividade');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Atividade por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM atividade WHERE idatividade = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Atividade não encontrada' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Criar nova atividade
router.post('/', async (req, res) => {
  const { descricao_atividade, inicio_atividade, fim_atividade, status_atividade, id_plano } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO atividade (descricao_atividade, inicio_atividade, fim_atividade, status_atividade, id_plano) VALUES (?, ?, ?, ?, ?)',
      [descricao_atividade, inicio_atividade, fim_atividade, status_atividade, id_plano]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error('Erro no banco de dados:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT - Atualizar atividade
router.put('/:id', async (req, res) => {
  const { descricao_atividade, inicio_atividade, fim_atividade, status_atividade } = req.body;
  try {
    await pool.query(
      'UPDATE atividade SET descricao_atividade = ?, inicio_atividade = ?, fim_atividade = ?, status_atividade = ? WHERE idatividade = ?',
      [descricao_atividade, inicio_atividade, fim_atividade, status_atividade, req.params.id]
    );
    res.json({ message: 'Atividade atualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Deletar atividade
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM atividade WHERE id_atividade = ?', [req.params.id]);
    res.json({ message: 'Atividade deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
