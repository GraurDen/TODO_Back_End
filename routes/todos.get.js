import Router from 'express';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();
const DB_URL = path.join(__dirname, 'db.json');
const todoGetRouter = new Router();

todoGetRouter.get('/', (req, res) => {
    let db = fs.readFileSync(DB_URL, 'utf-8', (err, data) => {
        if (err) throw err;

        return JSON.parse(data);
    });
    // if(req.query === 'asc'){
    //     db.filter((item) => )
    // }
    console.log(req.query);
    res.send(db);
});

export default todoGetRouter;
