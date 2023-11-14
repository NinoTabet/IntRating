const { Pool } = require("pg");
let pool;

pool = new Pool({
  connectionString: process.env.DATABASE_URL
  ,ssl: {rejectUnauthorized: false},
});

module.exports = pool;