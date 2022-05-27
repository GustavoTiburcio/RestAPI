const getOrders = 'SELECT * FROM orders ORDER BY id';
const getOrderById = 'SELECT * FROM orders WHERE id=$1';
const getOrderProductsByOrderId = 'SELECT * FROM orders_products where order_id = $1 ORDER BY id';
const addOrder = 'INSERT INTO orders(customer, discount, amount, order_date) values ($1, $2, $3, $4) RETURNING id';
const addOrderProduct = 'INSERT INTO orders_products(product_id, order_id, product_price, quantity) VALUES ($1, $2, $3, $4) RETURNING id';


module.exports = {
    getOrders,
    getOrderById,
    getOrderProductsByOrderId,
    addOrder,
    addOrderProduct,

};