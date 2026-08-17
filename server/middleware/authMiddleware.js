const jwt = require("jsonwebtoken");

// 你的 JWT 密鑰，建議放在 .env 環境變數中
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  // 1. 從前端發送的 Cookie 中讀取名稱為 'token' 的值
  const token = req.cookies.token;

  // 2. 如果沒有 Token，拒絕存取並回傳 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: "未提供憑證，請先登入" });
  }

  // 3. 驗證 Token 的合法性與是否過期
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // 如果 Token 被竄改或已過期，回傳 403 Forbidden
      return res.status(403).json({ message: "憑證無效" });
    }

    // 4. 驗證成功，將解碼後的使用者資訊掛載到 req 物件上
    req.userInfo = decoded;

    // 5. 放行，交給下一個路由處理函式
    next();
  });
}

module.exports = authenticateToken;
