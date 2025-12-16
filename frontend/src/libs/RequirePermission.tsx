//check permission
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/storeHook"

interface Props {
    permission:string,
    children:React.ReactNode
}

const RequirePermission = ({permission,children}:Props)=>{
    const user = useAppSelector((state)=>state.auth.user);
        if (!user) return null;
     if (!user.permissions.includes(permission)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <>{children}</>;
}
export default RequirePermission;