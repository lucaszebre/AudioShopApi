const { Pool } = require('pg');
const  dotenv = require('dotenv');

dotenv.config();
const { DBConnLink } = process.env;

// const connectionConfig = {
//     user: 'blogpost_w659_user',
//     host:'dpg-cjn8oggcfp5c73fs160g-a.frankfurt-postgres.render.com',
//     database: 'blogpost_w659',
//     password: POSTGRESQL_PASSWORD,
//     port: 5432, // The default PostgreSQL port
// };

// const pool = new Pool(connectionConfig);

const pool = new Pool({
    connectionString: process.env.DBConnLink,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;





