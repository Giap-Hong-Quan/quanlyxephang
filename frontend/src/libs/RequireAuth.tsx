// # check có user / token Chỉ hỏi: “Có login chưa?”

import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../hooks/storeHook"


const RequireAuth =()=>{
    const user = useAppSelector((state)=>state.auth.user)
    if(!user) {
        return <Navigate to="/login" replace/>
    }
    return <Outlet/>
}
export default RequireAuth