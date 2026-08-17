const express = require("express");
const cors = require("cors");
const db = require("./db"); // 引入剛才寫的資料庫連線模組
require("dotenv").config();
const authRoutes = require("./routes/auth");
const app = express();
const authenticateToken = require("./middleware/authMiddleware.js");
const cookieParser = require("cookie-parser");
// Middleware 處理
app.use(cors());
app.use(cookieParser());
app.use(express.json()); // 解析 JSON 格式的請求內容

app.use("/api/auth", authRoutes);
// 測試用的路由
app.get("/api/status", async (req, res) => {
  try {
    // 隨便對資料庫下一個簡單的指令測試
    const [rows] = await db.query("SELECT 1 + 1 AS solution");
    res.json({ message: "API 與資料庫運作正常！", db_test: rows[0].solution });
  } catch (err) {
    res.status(500).json({ error: "資料庫錯誤" });
  }
});
app.get("/api/me", authenticateToken, (req, res) => {
  // 只要能進來這裡，代表 Token 驗證成功，且 req.user 已經有資料了
  // 直接回傳給前端
  res.json({
    success: true,
    userInfo: {
      id: req.userInfo.id,
      username: req.userInfo.username,
      nickname: req.userInfo.nickname,
    },
  });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
// 引入身分驗證路由
