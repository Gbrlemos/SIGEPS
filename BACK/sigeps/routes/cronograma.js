// routes/atividade.js
const express = require('express');
const router = express.Router();
const pool = require('../banco/bd');

// GET - Todos os usuários
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cronograma');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM  cronograma  WHERE idcronograma = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Cronograma não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Criar novo usuário
router.post('/', async (req, res) => {
  const { inicio_cronograma , fim_cronograma , status_cronograma } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO cronograma  (inicio_cronograma , fim_cronograma , status_cronograma ) VALUES (?, ?, ?)',
      [inicio_cronograma , fim_cronograma , status_cronograma ]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Atualizar usuário
router.put('/:id', async (req, res) => {
  const { inicio_cronograma , fim_cronograma , status_cronograma } = req.body;
  try {
    await pool.query(
      'UPDATE cronograma SET inicio_cronograma  = ?, fim_cronograma  = ?, status_cronograma  = ? WHERE idcronograma  = ?',
      [inicio_cronograma , fim_cronograma , status_cronograma ,  req.params.id]
    );
    res.json({ message: 'Cronograma atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Deletar usuário
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM cronograma WHERE idcronograma  = ?', [req.params.id]);
    res.json({ message: 'Cronograma deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
