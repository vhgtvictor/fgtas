const express = require('express');
const router = express.Router();
const db = require('../db.cjs');


router.get('/', (req, res) => {
  db.query('SELECT * FROM lancamentos ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});


router.post('/', (req, res) => {
  const {
    credor,
    baseFisica,
    tipoDespesa,
    mesCompetencia,
    dataVencimento,
    valorLiquido,
    valorMulta,
    valorJuros,
    valorCorrecao,
    valorTotal
  } = req.body;

  const sql =
    `INSERT INTO lancamentos
      (credor, base_fisica, tipo_despesa, mes_competencia, data_vencimento,
       valor_liquido, valor_multa, valor_juros, valor_correcao, valor_total)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    credor,
    baseFisica,
    tipoDespesa,
    mesCompetencia,
    dataVencimento,
    valorLiquido,
    valorMulta,
    valorJuros,
    valorCorrecao,
    valorTotal
  ], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.status(201).json({
      id: result.insertId,
      ...req.body
    });
  });
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    credor,
    baseFisica,
    tipoDespesa,
    mesCompetencia,
    dataVencimento,
    valorLiquido,
    valorMulta,
    valorJuros,
    valorCorrecao,
    valorTotal
  } = req.body;

  const sql =
    `UPDATE lancamentos SET
      credor=?, base_fisica=?, tipo_despesa=?, mes_competencia=?, data_vencimento=?,
      valor_liquido=?, valor_multa=?, valor_juros=?, valor_correcao=?, valor_total=?
     WHERE id=?`;

  db.query(sql, [
    credor,
    baseFisica,
    tipoDespesa,
    mesCompetencia,
    dataVencimento,
    valorLiquido,
    valorMulta,
    valorJuros,
    valorCorrecao,
    valorTotal,
    id
  ], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id, ...req.body });
  });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM lancamentos WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Registro deletado' });
  });
});

module.exports = router;
