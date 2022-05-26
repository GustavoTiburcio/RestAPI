const getProducts = 'SELECT * FROM products';
const getProductById = 'SELECT * FROM products WHERE id = $1';
const checkProductExists = 'SELECT s from products s WHERE s.name = $1';
const addProduct = 'INSERT INTO products(name, price) VALUES ($1, $2)';
const removeProduct = 'DELETE FROM products WHERE id = $1';
const updateProduct = 'UPDATE products SET name=$1 where id = $2';

module.exports = {
    getProducts,
    getProductById,
    checkProductExists,
    addProduct,
    removeProduct,
    updateProduct,
};