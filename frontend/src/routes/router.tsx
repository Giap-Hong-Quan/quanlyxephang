import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import Unauthorized from "../pages/Error/Unauthorized";
import NotFound from "../pages/Error/NotFound";
import RoleRedirect from "../libs/RequireAuth";
import Layout from "../layouts/Layout";
import RequirePermission from "../libs/RequirePermission";
import DashboardPage from "../pages/dashboard/DashboardPage";
import DevicePage from "../pages/device/DevicePage";
import ServicePage from "../pages/service/ServicePage";
import QueuePage from "../pages/queue/QueuePage";
import ReportPage from "../pages/report/ReportPage";
import RequireAuth from "../libs/RequireAuth";
const router = createBrowserRouter(
    [
        {path:"/login",element:<Login/>},
        { path: "/unauthorized", element: <Unauthorized /> },

        {path:"/",
        element: <RequireAuth/>,
        children:[
            {
                element: <Layout />, 
                children:[
                    {
                        index: true,
                        element: <RoleRedirect />,
                    },
                    {
                         path: "dashboard",
                        element: (
                        <RequirePermission permission="view_dashboard">
                            <DashboardPage />
                        </RequirePermission>
                        ),
                    },
                    {
                        path: "devices",
                        element: (
                        <RequirePermission permission="manage_devices">
                            <DevicePage />
                        </RequirePermission>
                        ),
                    },
                    {
                        path: "services",
                        element: (
                        <RequirePermission permission="manage_services">
                            <ServicePage />
                        </RequirePermission>
                        ),
                    },
                    {
                        path: "queue",
                        element: (
                        <RequirePermission permission="issue_queue_number">
                            <QueuePage />
                        </RequirePermission>
                        ),
                    },
                    {
                        path: "reports",
                        element: (
                        <RequirePermission permission="view_reports">
                            <ReportPage />
                        </RequirePermission>
                        ),
                    },
                    // setting
                ]
            }
           
        ]
        },




        // UNAUTHORIZED  and notfound
        {path: "*",element: <NotFound />},
    ]
)

export default router;