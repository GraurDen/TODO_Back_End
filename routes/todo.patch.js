const Router = require('express');
const config = require('../config');
const { todos } = require('../models/index');
const { Op } = require('sequelize');
const { param, body, validationResult } = require('express-validator');

const { dataBase } = config;
const todoPatchRouter = new Router();

todoPatchRouter.patch(
    '/:id',
    param('id').notEmpty().withMessage('Parametr "id" must be not empty'),
    body('name').optional(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { done, name } = req.body;

            const uniqueNameValidation = await todos.findOne({
                where: {
                    name: req.body.name,
                },
                [Op.not]: req.params.id,
            });

            if (uniqueNameValidation) {
                res.send(`Задача с именем ${req.body.name} существует`);
                return;
            }

            const updatedTodo = await todos.update(
                {
                    name,
                    done,
                },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            );

            res.send(updatedTodo);
        } catch (error) {
            res.send({ message: error.message });
        }
    }
);

module.exports = todoPatchRouter;
