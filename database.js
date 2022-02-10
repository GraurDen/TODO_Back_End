const { Sequelize } = require('sequelize');

// Connect to database
// TODO: change to 'connection string'
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
