import Router from 'express';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();
const DB_URL = path.join(__dirname, 'db.json');
const todoDelRouter = new Router();

todoDelRouter.delete('/:id', (req, res) => {
    fs.readFile(DB_URL, 'utf-8', (err, data) => {
        if (err) throw err;

        // get data from db
        const db = JSON.parse(data);

        const newDB = [...db.filter((task) => req.params.id !== task.id)];

        // write file
        fs.writeFile(DB_URL, JSON.stringify(newDB), (err) => {
            if (err) throw err;
        });
    });
    res.json(req.params.id);
});

export default todoDelRouter;
