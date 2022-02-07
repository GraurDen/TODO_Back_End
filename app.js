const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const config = require('./config');
const sequelize = require('./database');
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
        await sequelize.authenticate();
        console.log('Connected to db...');
        app.listen(port, () => console.log('SERVER STARTED ON PORT: ' + port));
    } catch (e) {
        console.e('Unable to connect to the database:', e);
        console.log(e);
    }
}

startApp();
