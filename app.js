require('dotenv').config();
const recursive = require('recursive-readdir-sync');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

recursive(`${__dirname}/routes`).forEach((file) =>
    app.use('/api', require(file))
);

async function startApp() {
    try {
        app.listen(port, () => console.log('SERVER STARTED ON PORT: ' + port));
    } catch (e) {
        console.e('Unable to connect to the database:', e);
        console.log(e);
    }
}

startApp();
