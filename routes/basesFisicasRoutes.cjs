const express = require('express');
const router = express.Router();
const db = require('../db.cjs');


router.get('/', (req, res) => {
  db.query('SELECT * FROM bases_fisicas ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});


router.post('/', (req, res) => {
  const { nome, endereco, cidade, estado } = req.body;

  if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });

  const sql =
    'INSERT INTO bases_fisicas (nome, endereco, cidade, estado) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, endereco, cidade, estado], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.status(201).json({
      id: result.insertId,
      nome,
      endereco,
      cidade,
      estado,
    });
  });
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, endereco, cidade, estado } = req.body;

  const sql =
    'UPDATE bases_fisicas SET nome=?, endereco=?, cidade=?, estado=? WHERE id=?';
  db.query(sql, [nome, endereco, cidade, estado, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ id, nome, endereco, cidade, estado });
  });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM bases_fisicas WHERE id=?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: 'Registro deletado' });
  });
});

module.exports = router;
