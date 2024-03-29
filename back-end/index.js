
import express from 'express';
import cidadeRoutes from './routes/cidadeRoutes.js'
import bairrosRoutes from './routes/bairrosRoutes.js';
import pessoasRoutes from './routes/pessoasRoutes.js';
import produtoRoutes from './routes/produtoRoutes.js';
import vendasRoutes from './routes/vendasRoutes.js';
import vendaItemRoutes from './routes/vendaItemRoutes.js';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())

app.use('/cidade', cidadeRoutes);
app.use('/bairro', bairrosRoutes);
app.use('/pessoas', pessoasRoutes);
app.use('/produto', produtoRoutes);
app.use('/venda', vendasRoutes);
app.use('/vendaItens', vendaItemRoutes)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
});
