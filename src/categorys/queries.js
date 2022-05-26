const getCategorys = 'SELECT * FROM categorys ORDER BY id';
const getCategoryById = 'SELECT * FROM categorys WHERE id = $1';
const checkCategoryExists = 'SELECT s from categorys s WHERE s.category = $1';
const addCategory = 'INSERT INTO categorys(category) VALUES ($1) RETURNING id';
const removeCategory = 'DELETE FROM categorys WHERE id = $1';
const updateCategory = 'UPDATE categorys SET category=$1 where id = $2';

module.exports = {
    getCategorys,
    getCategoryById,
    checkCategoryExists,
    addCategory,
    removeCategory,
    updateCategory,
};