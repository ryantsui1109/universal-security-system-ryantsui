import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"; // 引入剛才寫的 Hook

function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  // 1. 如果還在跟後端確認身分，先顯示載入中
  if (isLoading) {
    return <div>驗證身分中...</div>;
  }

  // 2. 如果沒有 user 資料，使用 <Navigate> 強制替換網址到 /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. 驗證通過！渲染裡面的子路由元件 (React Router v6 的寫法)
  return <Outlet />;
}

export default ProtectedRoute;
