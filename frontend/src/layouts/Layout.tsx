import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[#F2F4F8] overflow-hidden font-sans text-slate-700">
      {/* Clay Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 px-4 md:px-6 py-4 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto pt-4 pr-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
