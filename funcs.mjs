import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';
const __dirname = path.resolve();
// TODO: move to... ?
const DB_URL = path.join(__dirname, 'db.json');

// get all todos
// export function getAll(req, res) {
//     let todos = JSON.parse(fs.readFileSync(DB_URL, 'utf-8'));

//     if (req.query.sortBy === 'done') {
//         todos = todos.filter((item) => item.done === true);
//     }
//     if (req.query.sortBy === 'undone') {
//         todos = todos.filter((item) => item.done === false);
//     }

//     if (req.query.orderBy === 'asc') {
//         todos = todos.sort(orderByAsc);
//     }
//     if (req.query.orderBy === 'desc') {
//         todos = todos.sort(orderByDesc);
//     }

//     const pageSize = req.query.pp;
//     const page = req.query.page;

//     const lastIndex = page * pageSize;
//     const firstIndex = lastIndex - pageSize;

//     let currentTodos = todos.slice(firstIndex, lastIndex);

//     res.send({ count: todos.length, tasks: currentTodos });
// }

// add new todo
export function addTodo(req, res) {
    fs.readFile(DB_URL, 'utf-8', (err, data) => {
        // get data from db
        const tempDB = JSON.parse(data);

        // add task
        const task = {
            name: req.body.name ?? 'empty',
            id: v4(),
            done: req.body.done ?? false,
            createdAt: +new Date(),
        };

        tempDB.push(task);

        // write file
        fs.writeFileSync(DB_URL, JSON.stringify(tempDB));
    });
    res.json(req.body);
}
