import path from 'path';
const __dirname = path.resolve();
//const DB_URL = path.join(__dirname, 'db.json');

const config = {
    app: {
        port: process.env.PORT || 5000,
    },
    dataBase: path.join(__dirname, 'db.json'),
};

export default config;
