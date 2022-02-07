const Router = require('express');
const fs = require('fs');
const config = require('../config');
const { query, validationResult } = require('express-validator');

const { dataBase } = config;
const todoGetRouter = new Router();

todoGetRouter.get(
    '/',
    query('orderBy')
        .isIn(['asc', 'desc'])
        .withMessage(' Query "orderBy" must be "ascending" or "descending" '),
    query('sortBy')
        .isIn(['', 'done', 'undone'])
        .withMessage(' Query "filterBy" must be "all","done","undone" '),
    query('pp').isInt().withMessage(' query "pp" must be an integer '),
    query('page')
        .isInt()
        .custom((value) => value >= 1)
        .withMessage(' query "page" must be equal or greate then 0 '),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let todos = JSON.parse(fs.readFileSync(dataBase, 'utf-8'));

            if (req.query.sortBy === 'done') {
                todos = todos.filter((item) => item.done === true);
            }
            if (req.query.sortBy === 'undone') {
                todos = todos.filter((item) => item.done === false);
            }

            if (req.query.orderBy === 'asc') {
                todos = todos.sort((a, b) => a.createdAt - b.createdAt);
            }
            if (req.query.orderBy === 'desc') {
                todos = todos.sort((a, b) => b.createdAt - a.createdAt);
            }

            const pageSize = req.query.pp ?? 5;
            const page = req.query.page ?? 1;

            const lastIndex = page * pageSize;
            const firstIndex = lastIndex - pageSize;

            let currentTodos = todos.slice(firstIndex, lastIndex);

            res.send({ count: todos.length, tasks: currentTodos });
        } catch (error) {
            res.send({ message: error });
        }
    }
);

module.exports = todoGetRouter;
