const pool = require('../../db');
const queries = require('./queries');

const getTables = (req, res) => {
    pool.query(queries.getTables, (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const response = {
            RowsCount: results.rowCount,
            tables: results.rows.map(tables => {
                return {
                    id: tables.id,
                    number: tables.number,
                    available: tables.available,
                    customer: tables.customer,
                    request: {
                        type: 'GET',
                        description: 'Retorna os detalhes de uma mesa específica.',
                        url: 'http://localhost:3000/api/tables/' + tables.id
                    }
                }
            })
        }
        res.status(200).send(response);
    });
};

const getTableById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getTableById, [id], (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const noTableFound = !results.rows.length;

        if (noTableFound) {
            res.status(404).json({ message: 'Mesa inexistente, não foi possível buscar informações.' });
            return;
        }
        const response = {
            RowsCount: results.rowCount,
            table: results.rows,
            request: {
                type: 'GET',
                description: 'Retorna todos as mesas',
                url: 'http://localhost:3000/api/tables'
            },
        }
        res.status(200).send(response);
    });
};

const addTable = (req, res) => {
    const { number, available } = req.body;

    pool.query(queries.checkTableExists, [number], (error, results) => {
        if (results.rows.length) {
            res.status(406).json({ message: 'Mesa já existente, não foi possível inserir.' });
            return;
        }
        pool.query(queries.addTable, [number, available], (error, results) => {
            if (error) {
                return res.status(500).send({
                    error: error
                });
            }
            const response = {
                message: 'Mesa inserida com sucesso.',
                createdTable: {
                    id: results.rows[0].id,
                    number: number,
                },
                request: {
                    type: 'GET',
                    description: 'Retorna todos as mesas',
                    url: 'http://localhost:3000/api/tables'
                },
            }
            res.status(201).send(response);
        });
    });
};

const removeTable = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query(queries.getTableById, [id], (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const noTableFound = !results.rows.length;

        if (noTableFound) {
            res.status(404).json({ message: 'Mesa inexistente, não foi possível ser removido.' });
            return;
        }
        pool.query(queries.removeTable, [id], (error, results) => {
            if (error) {
                return res.status(500).send({
                    error: error
                });
            }
            const response = {
                message: `Mesa ${id} removida com sucesso.`,
                request: {
                    type: 'POST',
                    description: 'Insere uma Mesa',
                    url: 'http://localhost:3000/api/tables',
                    body: {
                        number: 'Number',
                        available: 'Boolean'
                    }
                }
            }
            res.status(200).send(response)
        });
    });
};

const updateTableNumber = (req, res) => {
    const id = parseInt(req.params.id);
    const { number } = req.body;

    pool.query(queries.getTableById, [id], (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const noTableFound = !results.rows.length;

        if (noTableFound) {
            res.status(404).json({ message: 'Mesa inexistente, não foi possível realizar a alteração.' });
            return;
        }

        pool.query(queries.checkTableExists, [number], (error, results) => {

            if (results.rows.length) {
                res.status(406).json({ message: 'Número de mesa já existente, não foi possível alterar.' });
                return;
            }

            pool.query(queries.updateTableNumber, [number, id], (error, results) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }
                const response = {
                    mensagem: 'Mesa alterada com sucesso',
                    editedTable: {
                        id: id,
                        number: number,
                        request: {
                            type: 'GET',
                            description: 'Retorna os detalhes de uma Mesa em específico.',
                            url: 'https://localhost:3000/api/products/' + id
                        }
                    }
                }
                res.status(200).send(response);
            });
        });
    });
}

const changeTableValues = (req, res) => {
    const id = parseInt(req.params.id);
    const { available, customer } = req.body;

    pool.query(queries.getTableById, [id], (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const noTableFound = !results.rows.length;

        if (noTableFound) {
            res.status(404).json({ message: 'Mesa inexistente, não foi possível realizar a alteração.' });
            return;
        }

        pool.query(queries.changeTableValues, [available, customer, id], (error, results) => {
            if (error) {
                return res.status(500).send({
                    error: error
                });
            }
            const response = {
                mensagem: 'Valores da mesa foram alterados com sucesso',
                editedTable: {
                    id: id,
                    available: available,
                    customer: customer,
                    request: {
                        type: 'GET',
                        description: 'Retorna os detalhes de uma Mesa em específico.',
                        url: 'https://localhost:3000/api/products/' + id
                    }
                }
            }
            res.status(200).send(response);
        });
    });
}

module.exports = {
    getTables,
    getTableById,
    addTable,
    removeTable,
    updateTableNumber,
    changeTableValues,

}