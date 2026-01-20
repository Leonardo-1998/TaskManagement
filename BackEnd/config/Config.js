const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.USER_DB || "postgres",
  password: process.env.PASSWORD_DB || "postgres",
  host: "localhost",
  port: 5432,
  database: "TaskManagementDB",
  idleTimeoutMillis: 1000,
});

module.exports = pool;
