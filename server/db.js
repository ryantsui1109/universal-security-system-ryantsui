const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 測試連線
pool
  .getConnection()
  .then((connection) => {
    console.log("成功連線至 MySQL 資料庫！");
    connection.release();
  })
  .catch((err) => {
    console.error("資料庫連線失敗：", err);
  });

module.exports = pool;
