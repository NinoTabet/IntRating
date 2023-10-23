const { Pool } = require("pg");

let pool;

if (process.env.NODE_ENV === "production") {
  // Use the Heroku Postgres URL
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // Use your local database configuration for development
  pool = new Pool({
    user: "jtxlohajbynwlq",
    password: "24d4675f3cd90bcb79a0bde0c8b45a94e5eaf7db112e7771520b1fbb66597bbe",
    host: "ec2-34-236-103-63.compute-1.amazonaws.com",
    port: 5432,
    database: "d6eoj01m6j0ugd",
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

module.exports = pool;
