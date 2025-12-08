const express = require('express');
const cors = require('cors');
const db = require('./db.cjs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const basesFisicasRoutes = require('./routes/basesFisicasRoutes.cjs');
const credoresRoutes = require('./routes/credorRoutes.cjs');
const tiposDespesasRoutes = require('./routes/tiposDespesasRoutes.cjs');
const lancamentosRoutes = require('./routes/lancamentosRoutes.cjs');
const relatoriosRoutes = require('./routes/relatoriosRoutes.cjs');


app.use('/api/bases-fisicas', basesFisicasRoutes);
app.use('/api/credores', credoresRoutes);
app.use('/api/tipos-despesas', tiposDespesasRoutes);
app.use('/api/lancamentos', lancamentosRoutes); 
app.use('/api/relatorios', relatoriosRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});