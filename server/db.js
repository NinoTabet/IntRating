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
    user: "qhpwtusxskcfng",
    password: "49dacc3b9a1acc7f1f38ca56f2406718e8ad36d27c9832676bddb996d7a7b5e9",
    host: "ec2-54-84-182-168.compute-1.amazonaws.com",
    port: 5432,
    database: "d4pmerm1s710f8",
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

module.exports = pool;
