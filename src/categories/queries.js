const getCategories = 'SELECT * FROM categories ORDER BY id';
const getCategoryById = 'SELECT * FROM categories WHERE id = $1';
const checkCategoryExists = 'SELECT s from categories s WHERE s.category = $1';
const addCategory = 'INSERT INTO categories(category) VALUES ($1) RETURNING id';
const removeCategory = 'DELETE FROM categories WHERE id = $1';
const updateCategory = 'UPDATE categories SET category=$1 where id = $2';

module.exports = {
    getCategories,
    getCategoryById,
    checkCategoryExists,
    addCategory,
    removeCategory,
    updateCategory,
};