const Router = require('express');
const { body } = require('express-validator');
const { todos } = require('../models/index');
const handleErrors = require('../helpers');
const todoPostRouter = new Router();

todoPostRouter.post(
    '/todo',
    body('name')
        .isLength({ min: 2 })
        .withMessage('Task name must be at least 4 chars long'),
    body('done').exists(),
    handleErrors,
    async (req, res) => {
        const { name, done } = req.body;
        console.log('user >>>', todos);
        try {
            const nameExisting = await todos.findOne({
                where: { name },
            });

            if (nameExisting) {
                return res.status(400).send({
                    message: `Задача с именем ${name} существует`,
                });
            }

            const todoCreate = await todos.create({ name, done });

            res.send(todoCreate);
        } catch (error) {
            res.send({ message: error.message });
        }
    }
);

module.exports = todoPostRouter;
