const { Sequelize } = require('sequelize');

// Connect to database
const sequelize = new Sequelize(
    'todo_db',
    process.env.DB_USERNAME,
    process.env.DB_PASS,
    {
        host: process.env.HOST,
        dialect: 'postgres',
    }
);

module.exports = sequelize;
