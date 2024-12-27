// routes/atividade.js
const express = require('express');
const router = express.Router();
const pool = require('../banco/bd');

// GET - Todos os usuários
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM recurso ');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM  recurso   WHERE idrecurso  = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Recurso  não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Criar novo usuário
router.post('/', async (req, res) => {
  const { nome_recurso  , quantidade_disponivel } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO recurso   (nome_recurso  , quantidade_disponivel ) VALUES (?, ?)',
      [nome_recurso , quantidade_disponivel ]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Atualizar usuário
router.put('/:id', async (req, res) => {
  const { nome_recurso  , quantidade_disponivel } = req.body;
  try {
    await pool.query(
      'UPDATE recurso  SET nome_recurso   = ?, quantidade_disponivel   = ? WHERE idrecurso   = ?',
      [nome_recurso  , quantidade_disponivel ,  req.params.id]
    );
    res.json({ message: 'Recurso atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Deletar usuário
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM recurso  WHERE idrecurso   = ?', [req.params.id]);
    res.json({ message: 'Recurso deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
