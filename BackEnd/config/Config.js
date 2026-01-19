const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "TaskManagementDB",
  idleTimeoutMillis: 1000,
});

async function testPool() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Database Terhubung:", res.rows[0]);
  } catch (err) {
    console.error("Gagal menghubungkan pool:", err.message);
  }
}

//testPool();

module.exports = pool;
