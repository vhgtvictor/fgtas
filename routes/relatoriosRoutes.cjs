const express = require('express');
const router = express.Router();
const db = require('../db.cjs');


router.get('/', (req, res) => {
  const { credor, baseFisica, tipoDespesa, dataInicio, dataFim } = req.query;

  let sql = `
    SELECT 
      d.id,
      c.nome AS credor,
      b.nome AS baseFisica,
      t.nome AS tipoDespesa,
      DATE_FORMAT(d.competencia, '%Y-%m') AS competencia,
      d.valor_total AS valorTotal
    FROM despesas d
    JOIN credores c ON c.id = d.credor_id
    JOIN bases_fisicas b ON b.id = d.base_fisica_id
    JOIN tipos_despesa t ON t.id = d.tipo_despesa_id
    WHERE 1 = 1
  `;

  const params = [];

  if (credor) {
    sql += ' AND c.nome LIKE ?';
    params.push(`%${credor}%`);
  }

  if (baseFisica) {
    sql += ' AND b.nome LIKE ?';
    params.push(`%${baseFisica}%`);
  }

  if (tipoDespesa) {
    sql += ' AND t.nome LIKE ?';
    params.push(`%${tipoDespesa}%`);
  }

  if (dataInicio) {
    sql += ' AND d.competencia >= ?';
    params.push(dataInicio);
  }

  if (dataFim) {
    sql += ' AND d.competencia <= ?';
    params.push(dataFim);
  }

  sql += ' ORDER BY d.competencia DESC';

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.json(results);
  });
});

module.exports = router;
