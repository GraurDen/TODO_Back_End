const { Sequelize } = require('sequelize');

// Connect to database
const sequelize = new Sequelize('todo_db', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
