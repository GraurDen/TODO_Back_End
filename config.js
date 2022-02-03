import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//const __dirname = path.resolve();
//const DB_URL = path.join(__dirname, 'db.json');

const config = {
    app: {
        port: process.env.PORT || 5000,
    },
    dataBase: path.join(__dirname, 'db.json'),
    dirName: __dirname,
};

export default config;
