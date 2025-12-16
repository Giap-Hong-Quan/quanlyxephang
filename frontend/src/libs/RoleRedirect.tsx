import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/storeHook";
import { PERMISSION_ROUTES } from "./MenuConfig";

const RoleRedirect = () => {
  const user = useAppSelector((state) => state.auth.user);

  // Chưa hydrate xong → render nothing (HOẶC loading)
  if (!user) return null;

  const route = PERMISSION_ROUTES.find(r =>
    user.permissions.includes(r.permission)
  );
  if (route) {
    return <Navigate to={route.path} replace />;
  }
  return <Navigate to="/unauthorized" replace />;
};

export default RoleRedirect;
