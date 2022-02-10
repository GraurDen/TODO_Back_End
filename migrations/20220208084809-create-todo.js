'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('todos', {
            user_id: {
                type: Sequelize.UUID,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            name: {
                type: Sequelize.STRING,
                unique: true,
            },
            done: {
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('todos');
    },
};
