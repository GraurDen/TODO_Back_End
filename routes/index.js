const Router = require('express');
const todoDelRouter = require('./todo.del');
const todoPatchRouter = require('./todo.patch');
const todosGetRouter = require('./todos.get');
const todoPostRouter = require('./todo.post');
const router = new Router();

router.use('/todo', todoDelRouter);
router.use('/todo', todoPatchRouter);
router.use('/todos', todosGetRouter);
router.use('/todo', todoPostRouter);

module.exports = router;
