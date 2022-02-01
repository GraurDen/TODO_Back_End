import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

async function startApp() {
    try {
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT: ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();
