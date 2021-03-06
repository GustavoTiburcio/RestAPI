const express = require('express');
const cors = require('cors');
const productsRoutes = require('./src/products/routes')
const categoriesRoutes = require('./src/categories/routes')
const tablesRoutes = require('./src/tables/routes')
const ordersRoutes = require('./src/orders/routes')

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(404).json({ message: 'Rota inexistente.' });
});

app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/tables', tablesRoutes);
app.use('/api/orders', ordersRoutes);


app.listen(port, () => console.log(`Está rodando na porta ${port}`));