const addOrder = 'INSERT INTO ORDERS(customer, discount, amount, order_date) values ($1, $2, $3, $4) RETURNING id';
const addOrderProduct = 'INSERT INTO orders_products(product_id, order_id, product_price, quantity) VALUES ($1, $2, $3, $4) RETURNING id';


module.exports = {
    addOrder,
    addOrderProduct
};