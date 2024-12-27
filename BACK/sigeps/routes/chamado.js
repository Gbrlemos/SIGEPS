// routes/chamado.js
const express = require('express');
const router = express.Router();
const pool = require('../banco/bd');

// GET - Todos os chamados
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM chamado');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - chamados por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM chamado WHERE idchamado = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Chamado não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Criar novo chamado
router.post('/', async (req, res) => {
  const { titulo_chamado, status_chamado, descricao_chamado, tipo_chamado, id_sistema } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO chamado (titulo_chamado, status_chamado, descricao_chamado, tipo_chamado, id_sistema) VALUES (?, ?, ?, ?, ?)',
      [titulo_chamado, status_chamado, descricao_chamado, tipo_chamado, id_sistema]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Atualizar chamado
router.put('/:id', async (req, res) => {
  const { titulo_chamado, status_chamado, descricao_chamado } = req.body;
  try {
    await pool.query(
      'UPDATE chamado SET titulo_chamado = ?, status_chamado = ?, descricao_chamado = ? WHERE idchamado = ?',
      [titulo_chamado, status_chamado, descricao_chamado, req.params.id]
    );
    res.json({ message: 'Chamado atualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Deletar chamado
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM chamado WHERE idchamado = ?', [req.params.id]);
    res.json({ message: 'Chamado deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
