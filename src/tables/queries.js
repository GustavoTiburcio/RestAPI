const getTables = 'SELECT * FROM tables ORDER BY id';
const getTableById = 'SELECT * FROM tables WHERE id = $1';
const checkTableExists = 'SELECT s from tables s WHERE s.number = $1';
const addTable = 'INSERT INTO tables(number, available) VALUES ($1, $2) RETURNING id';
const removeTable = 'DELETE FROM tables WHERE id = $1';
const updateTableNumber = 'UPDATE tables SET number = $1 where id = $2';
const changeTableValues = 'UPDATE tables SET available = $1, customer = $2 where id = $3';

module.exports = {
    getTables,
    getTableById,
    checkTableExists,
    addTable,
    removeTable,
    updateTableNumber,
    changeTableValues,
};