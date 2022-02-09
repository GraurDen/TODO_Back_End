require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const sequelize = require('./database');
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

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
