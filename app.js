import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import { v4 } from 'uuid';
import cors from 'cors';

const PORT = 5000;
const DB_URL = 'db.json';
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use((request, response, next) => {
    console.log('Middleware 1');
    next();
});

/**
 * Write file (add task)
 */
app.post('/task', (req, res) => {
    fs.readFile(DB_URL, 'utf-8', (err, data) => {
        if (err) throw err;

        // Получили данные из базы
        const db = JSON.parse(data);

        // Записываем в базу новую таску
        const task = { ...req.body, id: v4(), done: false };
        db.push(task);

        // Занести в файл данные из запроса
        fs.writeFile(DB_URL, JSON.stringify(db), (err) => {
            if (err) throw err;
        });
    });

    //console.log('db >>> ', JSON.parse(db));
    res.status(200).json(req.body);
});

/**
 * get
 */
app.get('/', (req, res) => {
    let db = [];
    fs.readFile(DB_URL, 'utf-8', (err, data) => {
        if (err) throw err;
        // Получили данные из базы
        db = JSON.parse(data);
        console.log('db > ', db);
        res.status(200).json(db);
    });
});

async function startApp() {
    try {
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT: ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();
