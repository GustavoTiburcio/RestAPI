const pool = require('../../db');
const queries = require('./queries');

const getCategorys = (req, res) => {
    pool.query(queries.getCategorys, (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const response = {
            RowsCount: results.rowCount,
            categorys: results.rows.map(category => {
                return {
                    id: category.id,
                    name: category.category,
                    request: {
                        type: 'GET',
                        description: 'Retorna os detalhes de uma categoria específica.',
                        url: 'http://localhost:3000/api/categorys/' + category.id
                    }
                }
            })
        }
        res.status(200).send(response);
    });
};

const getCategoryById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getCategoryById, [id], (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const noCategoryFound = !results.rows.length;

        if (noCategoryFound) {
            res.status(404).json({ message: 'Categoria inexistente, não foi possível buscar informações.' });
            return;
        }
        const response = {
            RowsCount: results.rowCount,
            category: results.rows,
            request: {
                type: 'GET',
                description: 'Retorna todos as categorias',
                url: 'http://localhost:3000/api/categorys'
            },
        }
        res.status(200).send(response);
    });
};

const addCategory = (req, res) => {
    const { category } = req.body;

    pool.query(queries.checkCategoryExists, [category], (error, results) => {
        if (results.rows.length) {
            res.status(406).json({ message: 'Categoria já existente, não foi possível inserir.' });
            return;
        }
        pool.query(queries.addCategory, [category], (error, results) => {
            if (error) {
                return res.status(500).send({
                    error: error
                });
            }
            const response = {
                message: 'Categoria inserida com sucesso.',
                createdCategory: {
                    id: results.rows[0].id,
                    name: category,
                },
                request: {
                    type: 'GET',
                    description: 'Retorna todas as categorias',
                    url: 'http://localhost:3000/api/categorys'
                }
            }
            res.status(201).send(response);
        });
    });
};

const removeCategory = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query(queries.getCategoryById, [id], (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const noCategoryFound = !results.rows.length;

        if (noCategoryFound) {
            res.status(404).json({ message: 'Categoria inexistente, não foi possível ser removido.' });
            return;
        }
        pool.query(queries.removeCategory, [id], (error, results) => {
            if (error) {
                return res.status(500).send({
                    error: error
                });
            }
            const response = {
                message: `Categoria ${id} removida com sucesso.`,
                request: {
                    type: 'POST',
                    description: 'Insere uma categoria',
                    url: 'http://localhost:3000/api/categorys',
                    body: {
                        name: 'String',
                    }
                }
            }
            res.status(200).send(response)
        });
    });
};

const updateCategory = (req, res) => {
    const id = parseInt(req.params.id);
    const { category } = req.body;

    pool.query(queries.getCategoryById, [id], (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const noCategoryFound = !results.rows.length;

        if (noCategoryFound) {
            res.status(404).json({ message: 'Categoria inexistente, não foi possível realizar a alteração.' });
            return;
        }
        pool.query(queries.updateCategory, [category, id], (error, results) => {
            if (error) {
                return res.status(500).send({
                    error: error
                });
            }
            const response = {
                mensagem: 'Categoria alterada com sucesso',
                editedCategory:{
                    id: id,
                    name: category,
                    request: {
                        type: 'GET',
                        description: 'Retorna os detalhes de uma Categoria em específico.',
                        url: 'https://localhost:3000/api/categorys/' + id
                    }
                }
            }
            res.status(200).send(response);
        });
    });
}

module.exports = {
    getCategorys,
    getCategoryById,
    addCategory,
    removeCategory,
    updateCategory,

}