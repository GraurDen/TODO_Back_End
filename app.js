import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

import cors from 'cors';
import router from './routes/index.js';
import path from 'path';
const __dirname = path.resolve();
const DB_URL = path.join(__dirname, 'db.json');

const PORT = 5000;
//const DB_URL = 'db.json';
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/api', router);

/**
 * patch -> edit taska name
 */
// app.patch('/api/task/:id', (req, res) => {
//     fs.readFile(DB_URL, 'utf-8', (err, data) => {
//         if (err) throw err;

//         // get data from db
//         const db = JSON.parse(data);

//         const newDB = [
//             ...db.map((task) =>
//                 req.params.id === task.id
//                     ? { ...task, name: req.body.name }
//                     : { ...task }
//             ),
//         ];

//         // write file
//         fs.writeFile(DB_URL, JSON.stringify(newDB), (err) => {
//             if (err) throw err;
//         });
//     });

//     //
//     if (!req.params.id) {
//         //
//     }
//     res.json(req.params.id);
// });

/**
 * patch ->  done / undone
 */
// app.patch('/api/task/:id', (req, res) => {
//     fs.readFile(DB_URL, 'utf-8', (err, data) => {
//         if (err) throw err;

//         // get data from db
//         const db = JSON.parse(data);

//         const newDB = [
//             ...db.map((task) =>
//                 req.query.id === task.id
//                     ? { ...task, done: !task.done }
//                     : { ...task }
//             ),
//         ];

//         // write file
//         fs.writeFile(DB_URL, JSON.stringify(newDB), (err) => {
//             if (err) throw err;
//         });
//     });
//     res.json(req.params.id);
// });

/**
 * post -> add task
 */
// app.post('/api/task', (req, res) => {
//     fs.readFile(DB_URL, 'utf-8', (err, data) => {
//         if (err) throw err;

//         // get data from db
//         const newDB = JSON.parse(data);

//         // add task
//         const task = { ...req.body, id: v4(), done: false };

//         newDB.push(task);

//         // write file
//         fs.writeFile(DB_URL, JSON.stringify(newDB), (err) => {
//             if (err) throw err;
//         });
//     });
//     res.status(200).json(req.body);
// });

/**
 * get all tasks
 */
// app.get('/api', (req, res) => {
//     let db;
//     fs.readFile(DB_URL, 'utf-8', (err, data) => {
//         if (err) throw err;
//         // get data
//         db = JSON.parse(data);
//         console.log('db >>> ', db);
//     });

//     res.status(200).send('Hello');
// });

/**
 * delete task
 */
// app.delete('/api/task/:id', (req, res) => {
//     fs.readFile(DB_URL, 'utf-8', (err, data) => {
//         if (err) throw err;

//         // get data from db
//         const db = JSON.parse(data);

//         const newDB = [...db.filter((task) => req.params.id !== task.id)];

//         // write file
//         fs.writeFile(DB_URL, JSON.stringify(newDB), (err) => {
//             if (err) throw err;
//         });
//     });
//     res.json(req.params.id);
// });

async function startApp() {
    try {
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT: ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();
