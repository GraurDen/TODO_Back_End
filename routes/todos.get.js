import Router from 'express';
import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';
const __dirname = path.resolve();
// TODO: move to... ?
const DB_URL = path.join(__dirname, 'db.json');
const todoGetRouter = new Router();

todoGetRouter.get('/', (req, res) => {
    let todos = JSON.parse(fs.readFileSync(DB_URL, 'utf-8'));

    if (req.query.sortBy === 'done') {
        todos = todos.filter((item) => item.done === true);
    }
    if (req.query.sortBy === 'undone') {
        todos = todos.filter((item) => item.done === false);
    }

    if (req.query.orderBy === 'asc') {
        todos = todos.sort(orderByAsc);
    }
    if (req.query.orderBy === 'desc') {
        todos = todos.sort(orderByDesc);
    }

    const pageSize = req.query.pp;
    const page = req.query.page;

    const lastIndex = page * pageSize;
    const firstIndex = lastIndex - pageSize;

    let currentTodos = todos.slice(firstIndex, lastIndex);

    res.send({ count: todos.length, tasks: currentTodos });
});

function orderByAsc(a, b) {
    return a.createdAt - b.createdAt;
}
function orderByDesc(a, b) {
    return b.createdAt - a.createdAt;
}
export default todoGetRouter;
