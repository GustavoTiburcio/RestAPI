const getProducts = 'SELECT * FROM products ORDER BY id';
const getProductById = 'SELECT * FROM products WHERE id = $1';
const checkProductExists = 'SELECT s from products s WHERE s.name = $1';
const addProduct = 'INSERT INTO products(name, price) VALUES ($1, $2) RETURNING id';
const removeProduct = 'DELETE FROM products WHERE id = $1';
const updateProduct = 'UPDATE products SET name=$1, price=$2, category_id=$3 where id = $4';
const getProductsByCategoryId = 'SELECT * FROM products where category_id = $1 ORDER BY id';

module.exports = {
    getProducts,
    getProductById,
    checkProductExists,
    addProduct,
    removeProduct,
    updateProduct,
    getProductsByCategoryId,
};