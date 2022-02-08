const Router = require('express');
const { param, validationResult } = require('express-validator');
const { todos } = require('../models/index');
const todoDelRouter = new Router();

todoDelRouter.delete(
    '/:id',
    param('id').notEmpty().withMessage('Parametr "id" must be not empty'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            await todos.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.sendStatus(200);
        } catch (error) {
            res.send({ message: error.message });
        }
    }
);

module.exports = todoDelRouter;
