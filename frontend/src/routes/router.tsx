import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import NotFound from "../pages/Error/NotFound";
import RequireAuth from "../libs/RequireAuth";
import DashboardPage from "../pages/dashboard/DashboardPage";
import AdminLayout from "../layouts/Layout";
import ReportPage from "../pages/report/ReportPage";
import AccountPage from "../pages/accounts/AccountPage";
import Profile from "../pages/profile/Profile";

// import DevicePage from "../pages/device/DevicePage";
// import ServicePage from "../pages/service/ServicePage";
// import QueuePage from "../pages/queue/QueuePage";
// import ReportPage from "../pages/report/ReportPage";
// import RolePage from "../pages/setting/roles/RolePage";
// import AccountPage from "../pages/setting/accounts/AccountPage";
// import LogPage from "../pages/setting/log/LogPage";
// import CreateDevice from "../pages/device/CreateDevice";
// import UpdateDevice from "../pages/device/UpdateDevice";
// import DetailDevice from "../pages/device/DetailDevice";
// import CreateService from "../pages/service/CreateService";
// import UpdateService from "../pages/service/UpdateService";
// import CreateQueue from "../pages/queue/CreateQueue";
// import DetailService from "../pages/service/DetailService";
// import DetailQueue from "../pages/queue/DetailQueue";
// import CreateAccount from "../pages/setting/accounts/CreateAccount";
// import UpdateAccount from "../pages/setting/accounts/UpdateAccount";
// import CreateRole from "../pages/setting/roles/CreateRole";
// import UpdateRole from "../pages/setting/roles/UpdateRole";

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
                            { path: "dashboard", element: <DashboardPage /> },
                             { path: "profile", element: <Profile /> },
                            {
                                path: "devices",
                                children: [
                                    // { index: true, element: <DevicePage /> },       
                                    // { path: "create", element: <CreateDevice /> }, 
                                    // {path: "detail", element: <DetailDevice />},
                                    // {path: "update", element: <UpdateDevice />}
                                ],
                            },
                            {   path: "services",
                                children:[
                                    // {index: true,element: <ServicePage /> },
                                    // { path: "create", element: <CreateService /> }, 
                                    // { path: "detail", element: <DetailService /> }, 
                                    // { path: "update", element: <UpdateService /> }, 
                                ]
                            },
                            { path: "queues",
                                children:[
                                    // {index:true, element: <QueuePage /> },
                                    // { path: "create", element: <CreateQueue /> }, 
                                    // { path: "detail", element: <DetailQueue /> }, 
                                ]
                            },
                            { path: "reports", element: <ReportPage /> },
                            { path: "users",
                                  children:[
                                    // {index:true,  element: <AccountPage /> },
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