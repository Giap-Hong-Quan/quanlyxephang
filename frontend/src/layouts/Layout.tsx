import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const AdminLayout = () => {
  return (
  <div className="flex bg-[#DBDBDB80]">
    <Sidebar/>
    <div className="w-full pl-4">
      <Header/>
      <div className="pt-5">

      <Outlet  />
      </div>
    </div>
  </div>
  );
};

export default AdminLayout;
