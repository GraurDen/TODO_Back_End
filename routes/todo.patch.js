import Router from 'express';
import fs from 'fs';
import config from '../config.js';
import { param, body, validationResult } from 'express-validator';

const { dataBase } = config;
const todoPatchRouter = new Router();

todoPatchRouter.patch(
    '/:id',
    param('id').notEmpty().withMessage('Parametr "id" must be not empty'),
    body('name').optional(),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // get data from db
            const db = JSON.parse(fs.readFileSync(dataBase, 'utf-8'));

            const newDB = [...db];

            newDB.map((task) => {
                if (req.params.id === task.id && req.body.name) {
                    task.name = req.body.name;
                } else if (req.params.id === task.id) {
                    task.done = !task.done;
                }
            });

            // write file
            fs.writeFileSync(dataBase, JSON.stringify(newDB));
            res.json(req.params.id);
        } catch (error) {
            res.send({ message: error.message });
        }
    }
);

export default todoPatchRouter;
