const pool = require('../../db');
const queries = require('./queries');


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
            // request: {
            //     type: 'GET',
            //     description: 'Retorna todas as vendas',
            //     url: 'http://localhost:3000/api/orders'
            // }
        }
        res.status(201).send(response);
    });
};


module.exports = {
    addOrder,

}