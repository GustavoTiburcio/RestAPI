const pool = require('../../db');
const queries = require('./queries');

const getOrders = (req, res) => {
    pool.query(queries.getOrders, (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const response = {
            RowsCount: results.rowCount,
            Orders: results.rows.map(order => {
                return {
                    id: order.id,
                    customer: order.customer,
                    discount: order.discount,
                    amount: order.amount,
                    netAmount: order.amount - order.discount,
                    order_date: order.order_date,
                    request: {
                        type: 'GET',
                        description: 'Retorna os detalhes de uma venda específica.',
                        url: 'http://localhost:3000/api/orders/' + order.id
                    }
                }
            })
        }
        res.status(200).send(response);
    });
};

const getOrderById = (req, res) => {
    const id = parseInt(req.params.id);
    var order;

    pool.query(queries.getOrderById, [id], (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        const noOrderFound = !results.rows.length;
        if (noOrderFound) {
            res.status(404).json({ message: 'Venda inexistente, não foi possível buscar informações.' });
            return;
        }
        order = results;
        order.rows[0]['netAmount'] = order.rows[0].amount - order.rows[0].discount;
        console.log(order.rows)
        pool.query(queries.getOrderProductsByOrderId, [id], (error, results) => {
            if (error) {
                return res.status(500).send({
                    error: error
                });
            }
            const response = {
                RowsCount: order.rowCount,
                order: order.rows,
                orderProducts: results.rows,
                request: {
                    type: 'GET',
                    description: 'Retorna todos as vendas',
                    url: 'http://localhost:3000/api/orders'
                },
            }
            res.status(200).send(response);
        })
    });
};

const addOrder = (req, res) => {
    const { customer, discount, amount, order_date, orderProducts } = req.body;

    pool.query(queries.addOrder, [customer, discount, amount, order_date], (error, results) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        orderProducts.map(product => {
            pool.query(queries.addOrderProduct, [product.product_id, results.rows[0].id, product.product_price, product.quantity], (error, results) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }
            });
        });
        const response = {
            message: 'Venda inserida com sucesso.',
            createdOrder: {
                id: results.rows[0].id,
                customer: customer,
                discount: discount,
                amount: amount,
                order_date: order_date,
                orderProducts: orderProducts
            },
            request: {
                type: 'GET',
                description: 'Retorna todas as vendas.',
                url: 'http://localhost:3000/api/orders'
            }
        }
        res.status(201).send(response);
    });
};


module.exports = {
    getOrders,
    getOrderById,
    addOrder,

}