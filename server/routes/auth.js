const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db"); // 引入資料庫連線
const router = express.Router();
const jwt = require("jsonwebtoken");
// 註冊 API (POST /api/auth/register)
router.post("/register", async (req, res) => {
  const { username, nickname, password } = req.body;

  if (process.env.ALLOW_REGISTER === "true") {
    if (!username || !password) {
      return res.status(400).json({ message: "帳號和密碼為必填" });
    }
    try {
      const [existingUsers] = await db.query(
        "SELECT id FROM users WHERE username = ?",
        [username],
      );

      if (existingUsers.length > 0) {
        return res.status(409).json({ message: "帳號已被使用" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // 4. 將資料寫入資料庫
      const [result] = await db.query(
        "INSERT INTO users (username, nickname, password_hash) VALUES (?, ?, ?)",
        [username, nickname, hashedPassword],
      );

      res.status(201).json({
        message: "註冊成功！",
        userId: result.insertId,
      });
    } catch (err) {
      console.error("註冊錯誤：", err);
      res.status(500).json({ error: "伺服器內部錯誤" });
    }
  } else {
    res.status(403).json({ error: "禁止註冊" });
  }
});

// 登入 API (POST /api/auth/login)
router.post("/login", async (req, res) => {
  // 這裡我們允許使用者用 username 或 email 登入，統稱 account
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "請輸入帳號與密碼" });
  }

  try {
    // 1. 到資料庫尋找使用者
    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    // 如果找不到人
    if (users.length === 0) {
      // 資安小提醒：不要明確告訴使用者「帳號錯誤」或「密碼錯誤」，統一回覆「帳號或密碼錯誤」，避免駭客猜測帳號是否存在
      return res.status(401).json({ message: "帳號或密碼錯誤" });
    }

    const user = users[0];

    // 2. 比對密碼
    // bcrypt 會自動取出資料庫中 hashed_password 的鹽值，與使用者輸入的 password 進行比對
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "帳號或密碼錯誤" });
    }

    // 3. 密碼正確，準備簽發 JWT
    // Payload 裡面放不需要保密的無敏感資訊，例如使用者 ID
    const payload = {
      userId: user.id,
      username: user.username,
      nickname: user.nickname,
    };

    // 使用 .env 中的密鑰進行簽發，並設定 Token 過期時間為 7 天
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // (可選) 更新最後登入時間
    await db.query(
      "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?",
      [user.id],
    );

    // 4. 將 Token 與使用者資訊回傳給前端
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.json({
      message: "登入成功",
      userInfo:payload
    });
  } catch (err) {
    console.error("登入錯誤：", err);
    res.status(500).json({ error: "伺服器內部錯誤" });
  }
});
router.post("/logout",async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.status(200).json({message:"OK"})
});
module.exports = router;
