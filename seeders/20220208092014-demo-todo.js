'use strict';
const { v4 } = require('uuid');
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Todos', [
            {
                id: v4(),
                name: 'Smith',
                done: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Todos', null, {});
    },
};
