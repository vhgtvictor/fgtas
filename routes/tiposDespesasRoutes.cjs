const express = require('express');
const router = express.Router();
const db = require('../db.cjs');


router.get('/', (req, res) => {
  db.query('SELECT * FROM tipos_despesas ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});


router.post('/', (req, res) => {
  const { nome, descricao, categoria } = req.body;

  if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });

  const sql =
    'INSERT INTO tipos_despesas (nome, descricao, categoria) VALUES (?, ?, ?)';

  db.query(sql, [nome, descricao, categoria], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.status(201).json({
      id: result.insertId,
      nome,
      descricao,
      categoria,
    });
  });
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, categoria } = req.body;

  const sql =
    'UPDATE tipos_despesas SET nome=?, descricao=?, categoria=? WHERE id=?';

  db.query(sql, [nome, descricao, categoria, id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ id, nome, descricao, categoria });
  });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM tipos_despesas WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: 'Registro deletado' });
  });
});

module.exports = router;
