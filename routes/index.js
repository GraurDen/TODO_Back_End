import Router from 'express';
import todoDelRouter from './todo.del.js';
import todoPatchRouter from './todo.patch.js';
import todosGetRouter from './todos.get.js';
import todoPostRouter from './todo.post.js';
const router = new Router();

router.use('/todo', todoDelRouter);
router.use('/todo', todoPatchRouter);
router.use('/todos', todosGetRouter);
router.use('/todo', todoPostRouter);

export default router;
