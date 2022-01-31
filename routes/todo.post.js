import Router from 'express';
import path from 'path';
import fs from 'fs';
import { v4 } from 'uuid';

const __dirname = path.resolve();
const DB_URL = path.join(__dirname, 'db.json');
const todoPostRouter = new Router();

todoPostRouter.post('/', (req, res) => {
    fs.readFile(DB_URL, 'utf-8', (err, data) => {
        if (err) throw err;

        // get data from db
        const newDB = JSON.parse(data);

        // add task
        const task = {
            ...req.body,
            id: v4(),
            done: false,
            createdAt: new Date(),
        };

        newDB.push(task);

        // write file
        fs.writeFile(DB_URL, JSON.stringify(newDB), (err) => {
            if (err) throw err;
        });
    });
    res.status(200).json(req.body);
});

export default todoPostRouter;
