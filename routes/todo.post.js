import Router from 'express';
import { addTodo } from '../funcs.mjs';
const todoPostRouter = new Router();

todoPostRouter.post('/', addTodo);

export default todoPostRouter;
