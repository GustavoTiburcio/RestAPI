const pool = require('../../db');
const queries = require('./queries');

const getProducts = (req, res) => {
    pool.query(queries.getProducts, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getProductById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addProduct = (req, res) => {
    const { name, price } = req.body;

    //checando se nome ja existe
    pool.query(queries.checkProductExists, [name], (error, results) => {
        if (results.rows.length) {
            res.send('Produto já existente.');
        }
        //adicionando registro ao db
        pool.query(queries.addProduct, [name, price], (error, results) => {
            if (error) throw error;
            res.status(201).send('Produto registrado com sucesso.');
            console.log('Produto registrado com sucesso.');
        });
    });
};

const removeProduct = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getProductById, [id], (error, results) => {
        if (error) throw error;
        const noProductFound = !results.rows.length;
        if (noProductFound) {
            res.status(404).json({ message: 'Produto inexistente, não foi possível ser removido.' });
            return;
        }

        pool.query(queries.removeProduct, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send(`Produto ${id} removido com sucesso.`)
        });
    });
};

const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.getProductById, [id], (error, results) => {
        if (error) throw error;
        const noProductFound = !results.rows.length;
        if (noProductFound) {
            res.status(404).json({ message: 'Produto inexistente, não foi possível realizar a alteração.' });
            return;
        }
        
        pool.query(queries.updateProduct, [name], (error, results) => {
            if (error) throw error;
            res.status(200).send('Produto alterado com sucesso.');
        });
    });
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    removeProduct,
    updateProduct,
}