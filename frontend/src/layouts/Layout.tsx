import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[#DBDBDB80] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 pl-3">
        <Header />
        <div className="flex-1 overflow-y-auto pt-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
