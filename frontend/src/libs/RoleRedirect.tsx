import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/storeHook";
import { PERMISSION_ROUTES } from "./MenuConfig";

//# login xong redirect theo role  

const RoleRedirect= ()=>{
    const user = useAppSelector((state)=>state.auth.user);
    if (!user) return <Navigate to="/login" replace />;
      // tìm permission đầu tiên match
    const route = PERMISSION_ROUTES.find(r =>
    user.permissions.includes(r.permission)
    );
    if (route) return <Navigate to={route.path} replace />;
    return <Navigate to="/unauthorized" replace />;
}
export default RoleRedirect;