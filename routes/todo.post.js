const Router = require('express');
const { body, validationResult } = require('express-validator');
const { todos } = require('../models/index');
const todoPostRouter = new Router();

todoPostRouter.post(
    '/',
    body('name')
        .isLength({ min: 2 })
        .withMessage('Task name must be at least 4 chars long'),
    body('done').exists(),

    async (req, res) => {
        const { name, done } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const todoCreate = await todos.create({ name, done });

            res.send(todoCreate);
        } catch (error) {
            res.send({ message: error.message });
        }
    }
);

module.exports = todoPostRouter;
