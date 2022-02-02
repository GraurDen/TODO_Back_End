import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import config from './config.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

const {
    app: { port },
    dataBase,
} = config;

async function startApp() {
    try {
        app.listen(port, () => console.log('SERVER STARTED ON PORT: ' + port));
    } catch (e) {
        console.log(e);
    }
}

startApp();
