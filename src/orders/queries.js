const getOrders = 'SELECT * FROM orders ORDER BY id';
const getOrderById = 'SELECT * FROM orders WHERE id=$1';
const getOrderProductsByOrderId = 'SELECT * FROM orders_products INNER JOIN products ON orders_products.product_id = products.id WHERE order_id = $1 ORDER BY orders_products.id';
const checkOrderExists = 'SELECT s from orders s WHERE s.number = $1';
const checkProductExists = 'SELECT s from products s WHERE s.number = $1';
const addOrder = 'INSERT INTO orders(customer, discount, amount, order_date, in_progress, table_id) values ($1, $2, $3, $4, $5, $6) RETURNING id';
const addOrderProduct = 'INSERT INTO orders_products(product_id, order_id, product_price, quantity) VALUES ($1, $2, $3, $4) RETURNING id';
const removeOrder = 'DELETE FROM orders WHERE id = $1 RETURNING id';
const removeOrderProducts = 'DELETE FROM orders_products where order_id = $1';
const updateOrder = 'UPDATE orders SET customer = $1, discount = $2, amount = $3, order_date = $4 WHERE id = $5';
const finishOrderProgress = 'UPDATE orders SET in_progress = false WHERE table_id = $1 AND in_progress = true RETURNING id, in_progress';
const finishTableOrder = 'UPDATE tables SET available = true, customer = null WHERE id = $1 RETURNING id, available';

module.exports = {
    getOrders,
    getOrderById,
    getOrderProductsByOrderId,
    addOrder,
    addOrderProduct,
    checkOrderExists,
    checkProductExists,
    removeOrder,
    removeOrderProducts,
    updateOrder,
    finishOrderProgress,
    finishTableOrder

};