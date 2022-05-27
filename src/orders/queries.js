const getOrders = 'SELECT * FROM orders ORDER BY id';
const getOrderById = 'SELECT * FROM orders WHERE id=$1';
const getOrderProductsByOrderId = 'SELECT * FROM orders_products where order_id = $1 ORDER BY id';
const checkOrderExists = 'SELECT s from orders s WHERE s.number = $1';
const addOrder = 'INSERT INTO orders(customer, discount, amount, order_date) values ($1, $2, $3, $4) RETURNING id';
const addOrderProduct = 'INSERT INTO orders_products(product_id, order_id, product_price, quantity) VALUES ($1, $2, $3, $4) RETURNING id';
const removeOrder = 'DELETE FROM orders WHERE id = $1 RETURNING id';
const removeOrderProducts = 'DELETE FROM orders_products where order_id = $1';
const updateOrder = 'UPDATE orders set customer = $1, discount = $2, amount = $3, order_date = $4 where id = $5';

module.exports = {
    getOrders,
    getOrderById,
    getOrderProductsByOrderId,
    addOrder,
    addOrderProduct,
    checkOrderExists,
    removeOrder,
    removeOrderProducts,
    updateOrder,

};