const { Pool } = require('pg');
//const { Pool } = pg.default;

const pool = new Pool({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: '5432',
    database: 'todo_db',
});

module.exports = pool;
