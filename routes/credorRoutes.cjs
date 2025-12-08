const express = require('express');
const router = express.Router();
const db = require('../db.cjs');


router.get('/', (req, res) => {
  db.query('SELECT * FROM credores ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});


router.post('/', (req, res) => {
  const { nome, cnpj, telefone, email } = req.body;

  if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });

  const sql =
    'INSERT INTO credores (nome, cnpj, telefone, email) VALUES (?, ?, ?, ?)';

  db.query(sql, [nome, cnpj, telefone, email], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.status(201).json({
      id: result.insertId,
      nome,
      cnpj,
      telefone,
      email,
    });
  });
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, cnpj, telefone, email } = req.body;

  const sql =
    'UPDATE credores SET nome=?, cnpj=?, telefone=?, email=? WHERE id=?';

  db.query(sql, [nome, cnpj, telefone, email, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ id, nome, cnpj, telefone, email });
  });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM credores WHERE id=?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: 'Registro deletado' });
  });
});

module.exports = router;
