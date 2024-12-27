// routes/plano.js
const express = require('express');
const router = express.Router();
const pool = require('../banco/bd');

// GET - Todos os planos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM plano');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Plano por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM plano WHERE id_plano = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Plano não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Criar novo plano
router.post('/', async (req, res) => {
  const { nome_plano, descricao_plano, data_inicio, data_fim, status_plano, id_chamado } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO plano (nome_plano, descricao_plano, data_inicio, data_fim, status_plano, id_chamado) VALUES (?, ?, ?, ?, ?, ?)',
      [nome_plano, descricao_plano, data_inicio, data_fim, status_plano, id_chamado]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error('Erro no banco de dados:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT - Atualizar plano
router.put('/:id', async (req, res) => {
  const { nome_plano, descricao_plano, data_inicio, data_fim, status_plano } = req.body;
  try {
    await pool.query(
      'UPDATE plano SET nome_plano = ?, descricao_plano = ?, data_inicio = ?, data_fim = ?, status_plano = ? WHERE id_plano = ?',
      [nome_plano, descricao_plano, data_inicio, data_fim, status_plano, req.params.id]
    );
    res.json({ message: 'Plano atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Deletar plano
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM plano WHERE id_plano = ?', [req.params.id]);
    res.json({ message: 'Plano deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
