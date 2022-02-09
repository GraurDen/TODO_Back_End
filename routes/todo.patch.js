const Router = require('express');
const { todos } = require('../models/index');
const { Op } = require('sequelize');
const { param, body } = require('express-validator');
const handleErrors = require('../helpers');
const todoPatchRouter = new Router();

todoPatchRouter.patch(
    '/todo/:id',
    param('id').notEmpty().withMessage('Parametr "id" must be not empty'),
    body('name').optional(),
    handleErrors,
    async (req, res) => {
        try {
            const { done, name } = req.body;

            // Check req.body has 'name'
            if (name) {
                const nameExisting = await todos.findOne({
                    where: { name },
                    [Op.not]: [req.params.id],
                });

                if (nameExisting) {
                    res.send(`Задача с именем ${name} существует`);
                    return;
                }
            }

            await todos.update(
                {
                    name,
                    done,
                },
                { where: { id: req.params.id } }
            );

            res.send('Task updated');
        } catch (error) {
            res.send({ message: error.message });
        }
    }
);

module.exports = todoPatchRouter;
