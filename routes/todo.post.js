const Router = require('express');
const fs = require('fs');
const { v4 } = require('uuid');
const config = require('../config');
const { body, validationResult } = require('express-validator');
const pool = require('../db');
const todo = require('../models/todo.model');
const { Sequelize } = require('sequelize');

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
            // await todo.create({
            //     id: v4(),
            //     name: req.body.name,
            //     done: req.body.done ?? false,
            //     createdAt: new Date(),
            // });

            await todo.findAll();

            // get data from db
            //const tempDB = JSON.parse(fs.readFileSync(dataBase, 'utf-8'));

            // add task
            // const task = {
            //     name: req.body.name,
            //     id: v4(),
            //     done: req.body.done ?? false,
            //     createdAt: +new Date(),
            // };

            //tempDB.push(task);

            // write file
            //fs.writeFileSync(dataBase, JSON.stringify(tempDB));
            //
            res.send('hello');
        } catch (error) {
            res.send({ message: error.message });
        }
    }
);

module.exports = todoPostRouter;
