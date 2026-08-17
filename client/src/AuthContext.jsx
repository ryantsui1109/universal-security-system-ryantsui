import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// 1. 建立 Context
const AuthContext = createContext();

// 2. 建立 Provider 元件
export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 網頁初次載入時，自動去後端驗證 Cookie 是否有效
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get("/api/me", {
          withCredentials: true,
        });
        setUserInfo(response.data.userInfo); // 驗證成功，存入使用者資料
      } catch (error) {
        setUserInfo(null); // 驗證失敗 (沒登入或過期)
      } finally {
        setIsLoading(false); // 結束載入狀態
      }
    }
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user: userInfo, setUser: setUserInfo, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. 建立一個自訂 Hook 方便其他元件使用
export const useAuth = () => useContext(AuthContext);
