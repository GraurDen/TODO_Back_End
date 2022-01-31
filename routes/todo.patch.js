import Router from 'express';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();
const DB_URL = path.join(__dirname, 'db.json');
const todoPatchRouter = new Router();

todoPatchRouter.patch('/:id', (req, res) => {
    fs.readFile(DB_URL, 'utf-8', (err, data) => {
        if (err) throw err;

        // get data from db
        const db = JSON.parse(data);

        const newDB = [...db];

        newDB.map((task) => {
            if (req.params.id === task.id && req.body.name) {
                task.name = req.body.name;
            } else if (req.params.id === task.id) {
                task.done = !task.done;
            }
        });

        // write file
        fs.writeFile(DB_URL, JSON.stringify(newDB), (err) => {
            if (err) throw err;
        });
    });
    res.json(req.params.id);
});

export default todoPatchRouter;
