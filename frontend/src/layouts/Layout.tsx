import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const AdminLayout = () => {
  return (
  <div className="flex bg-[#DBDBDB80]">
    <Sidebar/>
    <div className="w-full px-4">
      <Header/>
      <Outlet/>
    </div>
  </div>
  );
};

export default AdminLayout;
