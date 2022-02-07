const path = require('path');

const config = {
    app: {
        port: process.env.PORT || 5000,
    },
    dataBase: path.join(__dirname, 'db.json'),
    dirName: __dirname,
};

module.exports = config;
