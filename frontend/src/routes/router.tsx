import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import NotFound from "../pages/Error/NotFound";
import RequireAuth from "../libs/RequireAuth";
import AdminLayout from "../layouts/Layout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import DevicePage from "../pages/device/DevicePage";
import ServicePage from "../pages/service/ServicePage";
import QueuePage from "../pages/queue/QueuePage";
import ReportPage from "../pages/report/ReportPage";
import UserPage from "../pages/setting/users/UserPage";
import LogPage from "../pages/setting/log/LogPage";
import Profile from "../pages/profile/Profile";
// import DashboardPage from "../pages/dashboard/DashboardPage";
// import AdminLayout from "../layouts/Layout";
// import ReportPage from "../pages/report/ReportPage";
// // import Profile from "../pages/profile/Profile";
// import DevicePage from "../pages/device/DevicePage";
// import QueuePage from "../pages/queue/QueuePage";
// import ServicePage from "../pages/service/ServicePage";
// import UserPage from "../pages/users/UserPage";
const router = createBrowserRouter(
    [
        {path:"/login",element:<Login/>},
        {
            path: "/",
            element: <RequireAuth />,
            children: [
                {
                    element: <AdminLayout />,
                    children:[  
                            { index: true, element: <Navigate to="/dashboard" /> },
                            { path: "dashboard", element: <DashboardPage /> },
                            { path: "profile", element: <Profile /> },
                            {
                                path: "devices",
                                children: [
                                     { index: true, element: <DevicePage />},       
                                    // { path: "create", element: <CreateDevice /> }, 
                                    // {path: "detail", element: <DetailDevice />},
                                    // {path: "update", element: <UpdateDevice />}
                                ],
                            },
                            {   path: "services",
                                children:[
                                    {index: true,element: <ServicePage />},
                                    // { path: "create", element: <CreateService /> }, 
                                    // { path: "detail", element: <DetailService /> }, 
                                    // { path: "update", element: <UpdateService /> }, 
                                ]
                            },
                            { path: "queues",
                                children:[
                                    {index:true, element: <QueuePage />},
                                    // { path: "create", element: <CreateQueue /> }, 
                                    // { path: "detail", element: <DetailQueue /> }, 
                                ]
                            },
                            { path: "reports", element: <ReportPage />},
                            { path: "settings",
                                children:[
                                    {path:"users",
                                        children:[
                                            {index:true, element: <UserPage />},
                                        ]
                                    },
                                    {path:"logs",
                                        children:[
                                            {index:true, element: <LogPage />},
                                        ]
                                    },
                                   ]
                            },
                    ]
                }
            ]
        },
        // UNAUTHORIZED  and notfound
        {path: "*",element: <NotFound />},
    ]
)

export default router;