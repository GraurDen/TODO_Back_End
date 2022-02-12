const Router = require('express');
const { todos } = require('../models/index');
const { query } = require('express-validator');
const { handleErrors } = require('../helpers');
const todoGetRouter = new Router();

todoGetRouter.get(
    '/todos',
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
    handleErrors,
    async (req, res) => {
        try {
            let sortBy;
            if (req.query.sortBy === 'done') {
                sortBy = true;
            }
            if (req.query.sortBy === 'undone') {
                sortBy = false;
            }

            console.log('req.query.sortBy >>', sortBy);
            const pp = req.query.pp || 5;
            const orderBy = req.query.orderBy || 'desc';
            const page = req.query.page || 1;

            const getAll = await todos.findAndCountAll({
                where: sortBy === undefined ? {} : { done: sortBy },
                order: [['createdAt', orderBy]],
                offset: pp * (page - 1),
                limit: pp,
            });

            res.send(getAll);
        } catch (error) {
            res.send({ message: error });
        }
    }
);

module.exports = todoGetRouter;
