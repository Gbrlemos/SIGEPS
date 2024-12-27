// routes/sistema.js
const express = require('express');
const router = express.Router();
const pool = require('../banco/bd');

// GET - Todos os sistemas
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM sistema');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Atualizar sistema
router.put('/:id', async (req, res) => {
    const { nome_sistema, tipo_sistema, versao_sistema, data_criacao_sistema, ultima_atualizacao_sistema } = req.body;
    try {
      await pool.query(
        'UPDATE sistema SET nome_sistema = ?, tipo_sistema = ?, versao_sistema = ?, data_criacao_sistema = ?, ultima_atualizacao_sistema = ? WHERE idsistema = ?',
        [nome_sistema, tipo_sistema, versao_sistema, data_criacao_sistema, ultima_atualizacao_sistema, req.params.id]
      );
      res.json({ message: 'Sistema atualizado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// POST - Criar novo sistema
router.post('/', async (req, res) => {
  const { nome_sistema, tipo_sistema } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO sistema (nome_sistema, tipo_sistema, versao_sistema) VALUES (?, ?, 1.0)',
      [nome_sistema, tipo_sistema]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Deletar sistema
router.delete('/:id', async (req, res) => {
    try {
      await pool.query('DELETE FROM sistema WHERE idsistema = ?', [req.params.id]);
      res.json({ message: 'Sistema deletado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


module.exports = router;
