const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

// Create todo
const todo = sequelize.define('todo', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = todo;
