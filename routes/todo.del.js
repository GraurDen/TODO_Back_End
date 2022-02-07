const Router = require('express');
const fs = require('fs');
const config = require('../config');
const { param, validationResult } = require('express-validator');

const { dataBase } = config;
const todoDelRouter = new Router();

todoDelRouter.delete(
    '/:id',
    param('id').notEmpty().withMessage('Parametr "id" must be not empty'),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // get db
            const db = JSON.parse(fs.readFileSync(dataBase, 'utf-8'));

            const newDB = [...db.filter((task) => req.params.id !== task.id)];

            // write db
            fs.writeFileSync(dataBase, JSON.stringify(newDB));

            res.send(`User with ID:${req.params.id} deleted`);
        } catch (error) {
            res.send({ message: error.message });
        }
    }
);

module.exports = todoDelRouter;
