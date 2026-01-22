// # check có user / token Chỉ hỏi: “Có login chưa?”

import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
