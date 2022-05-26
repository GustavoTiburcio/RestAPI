const pool = require('../../db');
const queries = require('./queries');

const getProducts = (req, res) => {
    pool.query(queries.getProducts, (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const response = {
            RowsCount: results.rowCount,
            products: results.rows.map(prod => {
                return {
                    id: prod.id,
                    name: prod.name,
                    price: prod.price,
                    category_id: prod.category_id,
                    request: {
                        type: 'GET',
                        description: 'Retorna os detalhes de um produto específico',
                        url: 'http://localhost:3000/api/products/' + prod.id
                    }
                }
            })
        }
        res.status(200).send(response);
    });
};

const getProductById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getProductById, [id], (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const noProductFound = !results.rows.length;
        if (noProductFound) {
            res.status(404).json({ message: 'Produto inexistente, não foi possível buscar informações.' });
            return;
        }

        const response = {
            RowsCount: results.rowCount,
            product: results.rows,
            request: {
                type: 'GET',
                description: 'Retorna todos os produtos',
                url: 'http://localhost:3000/api/products'
            },
        }
        res.status(200).send(response);
    });
};

const getProductsByCategoryId = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getProductsByCategoryId, [id], (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const noProductsFound = !results.rows.length;
        if (noProductsFound) {
            res.status(404).json({ message: `Nenhum produto encontrado na categoria ${id}` })
            return;
        }

        const response = {
            RowsCount: results.rowCount,
            product: results.rows,
            request: {
                type: 'GET',
                description: 'Retorna lista de categorias',
                url: 'http://localhost:3000/api/categorys'
            },
        }
        res.status(200).send(response);
    });
};

const addProduct = (req, res) => {
    const { name, price, category_id } = req.body;

    //checando se nome ja existe
    pool.query(queries.checkProductExists, [name], (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        if (results.rows.length) {
            res.status(406).json({ message: 'Produto já existente, não foi possível inserir.' });
            return;
        }
        //checando se existe a categoria
        pool.query(queries.checkCategoryExists, [category_id], (error, results) => {
            if (error) {
                return res.status(500).send({
                    error: error
                });
            }
            if (!results.rows.length) {
                res.status(404).json({ message: 'A category_id informada não existe na tabela categoria.' });
                console.log('entrou');
                return;
            }
            //adicionando registro ao db
            pool.query(queries.addProduct, [name, price, category_id], (error, results) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }
                const response = {
                    message: 'Produto inserido com sucesso.',
                    createdProduct: {
                        id: results.rows[0].id,
                        name: name,
                        price: price,
                        category_id: category_id
                    },
                    request: {
                        type: 'GET',
                        description: 'Retorna todos os produtos',
                        url: 'http://localhost:3000/api/products'
                    }
                }
                res.status(201).send(response);
            });
        });
    });
};

const removeProduct = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getProductById, [id], (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const noProductFound = !results.rows.length;

        if (noProductFound) {
            res.status(404).json({ message: 'Produto inexistente, não foi possível ser removido.' });
            return;
        }

        pool.query(queries.removeProduct, [id], (error, results) => {
            if (error) {
                return res.status(500).send({
                    error: error
                });
            }
            const response = {
                message: `Produto ${id} removido com sucesso`,
                request: {
                    type: 'POST',
                    description: 'Insere um produto',
                    url: 'http://localhost:3000/api/products',
                    body: {
                        name: 'String',
                        price: 'Number',
                        category_id: 'Number'
                    }
                }
            }
            res.status(200).send(response)
        });
    });
};

const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price, category_id } = req.body;

    pool.query(queries.getProductById, [id], (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const noProductFound = !results.rows.length;

        if (noProductFound) {
            res.status(404).json({ message: 'Produto inexistente, não foi possível realizar a alteração.' });
            return;
        }

        pool.query(queries.checkCategoryExists, [category_id], (error, results) => {
            if (error) {
                return res.status(500).send({
                    error: error
                });
            }
            if (!results.rows.length) {
                res.status(404).json({ message: 'A category_id informada não existe na tabela categoria.' });
                console.log('entrou');
                return;
            }

            pool.query(queries.updateProduct, [name, price, category_id, id], (error, results) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }
                const response = {
                    mensagem: 'Produto alterado com sucesso',
                    editedProduct: {
                        id: id,
                        name: name,
                        price: price,
                        category_id: category_id,
                        request: {
                            type: 'GET',
                            description: 'Retorna os detalhes de um produto em especifico',
                            url: 'https://localhost:3000/api/products/' + id
                        }
                    }
                }
                res.status(200).send(response);
            });
        });
    });
};


module.exports = {
    getProducts,
    getProductById,
    addProduct,
    removeProduct,
    updateProduct,
    getProductsByCategoryId
}