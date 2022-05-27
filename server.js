const express = require('express');
const productsRoutes = require('./src/products/routes')
const categorysRoutes = require('./src/categorys/routes')
const tablesRoutes = require('./src/tables/routes')

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) =>{
    res.status(404).json({ message: 'Rota inexistente.' });
});

app.use('/api/products', productsRoutes);
app.use('/api/categorys', categorysRoutes);
app.use('/api/tables', tablesRoutes);


app.listen(port, () => console.log(`Está rodando na porta ${port}`));