import Router from 'express';
import todoDelRouter from './todo.del.js';
import todoPatchRouter from './todo.patch.js';
import todoGetRouter from './todos.get.js';
import todoPostRouter from './todo.post.js';
const router = new Router();

router.use('/todo', todoDelRouter);
router.use('/todo', todoPatchRouter);
router.use('/todos', todoGetRouter);
router.use('/todo', todoPostRouter);

export default router;
