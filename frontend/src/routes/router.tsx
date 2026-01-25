import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import NotFound from "../pages/Error/NotFound";
import RequireAuth from "../libs/RequireAuth";
import DashboardPage from "../pages/dashboard/DashboardPage";
import AdminLayout from "../layouts/Layout";
import ReportPage from "../pages/report/ReportPage";
import Profile from "../pages/profile/Profile";
import DevicePage from "../pages/device/DevicePage";
import QueuePage from "../pages/queue/QueuePage";
import ServicePage from "../pages/service/ServicePage";
import UserPage from "../pages/users/UserPage";
const router = createBrowserRouter(
    [
        {path:"/login",element:<Login/>},
        // { path: "/unauthorized", element: <Unauthorized /> },
        {
            path: "/",
            element: <RequireAuth />,
            children: [
                {
                    element: <AdminLayout />,
                    children:[  
                            { index: true, element: <Navigate to="/dashboard" /> },
                            { path: "dashboard", element: <DashboardPage /> ,handle: { current: "Dashboard" }},
                             { path: "profile", element: <Profile />,handle: { current: "Thông tin cá nhân" } },
                            {
                                path: "devices",
                                children: [
                                     { index: true, element: <DevicePage />,handle: { parent: "Thiết bị", current: "Danh sách thiết bị" } },       
                                    // { path: "create", element: <CreateDevice /> }, 
                                    // {path: "detail", element: <DetailDevice />},
                                    // {path: "update", element: <UpdateDevice />}
                                ],
                            },
                            {   path: "services",
                                children:[
                                    {index: true,element: <ServicePage />, handle: { parent: "Dịch vụ", current: "Danh sách dịch vụ" }},
                                    // { path: "create", element: <CreateService /> }, 
                                    // { path: "detail", element: <DetailService /> }, 
                                    // { path: "update", element: <UpdateService /> }, 
                                ]
                            },
                            { path: "queues",
                                children:[
                                    {index:true, element: <QueuePage />,handle: { parent: "Cấp số", current: "Danh sách cấp số" } },
                                    // { path: "create", element: <CreateQueue /> }, 
                                    // { path: "detail", element: <DetailQueue /> }, 
                                ]
                            },
                            { path: "reports", element: <ReportPage />,handle: { parent: "Báo cáo", current: "Lập báo cáo " } },
                            { path: "users",
                                  children:[
                                    {index:true,  element: <UserPage />,handle: { parent: "Tài khoản", current: "Danh sách tài khoản " }},
                                    //{path:"create",element:<CreateAccount/>},
                                    //{path:"update",element:<UpdateAccount/>}
                                    ]
                            },
                    ]
                }
            ],
        },
   

        // UNAUTHORIZED  and notfound
        {path: "*",element: <NotFound />},
    ]
)

export default router;