import Router from 'express';
import fs from 'fs';
import { v4 } from 'uuid';
import config from '../config.js';
import { body, validationResult } from 'express-validator';
import pool from '../db.js';
const { dataBase } = config;

const todoPostRouter = new Router();

todoPostRouter.post(
    '/',
    body('name')
        .isLength({ min: 2 })
        .withMessage('Task name must be at least 4 chars long')
        .matches(/^[A-Za-z0-9\_]+$/)
        .withMessage('Task name must be alphanumeric only'),
    body('done').exists(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // get data from db
            const tempDB = JSON.parse(fs.readFileSync(dataBase, 'utf-8'));

            // add task
            const task = {
                name: req.body.name,
                id: v4(),
                done: req.body.done ?? false,
                createdAt: +new Date(),
            };

            tempDB.push(task);

            const todo = await pool.dataBase2.query(
                'INSERT INTO todo_db (id, name, done, createdAt) values ($1, $2, $3, $4) RETURNING*',
                [v4(), req.body.name, req.body.done, +new Date()]
            );
            // write file
            fs.writeFileSync(dataBase, JSON.stringify(tempDB));
            //
            res.json(todo);
        } catch (error) {
            res.send({ message: error.message });
        }
    }
);

export default todoPostRouter;
