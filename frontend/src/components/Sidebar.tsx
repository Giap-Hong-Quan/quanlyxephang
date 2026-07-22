import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from "../assets/image/logoalta.png";
import { 
  LayoutDashboard, 
  Monitor, 
  Layers, 
  ListOrdered, 
  FileSpreadsheet, 
  Settings, 
  LogOut, 
  Users, 
  FileText,
  ChevronRight
} from 'lucide-react';
import { useUserSocket } from '../hooks/useUserSocket';
import { useLogout } from '../hooks/authQuery';

const Sidebar = () => {
  const location = useLocation();
  useUserSocket();
  const logout = useLogout();

  const MENU = [
    { icon: LayoutDashboard, name: "Trang chủ", path: "/dashboard" },
    { icon: Monitor, name: "Thiết bị", path: "/devices" },
    { icon: Layers, name: "Dịch vụ", path: "/services" },
    { icon: ListOrdered, name: "Cấp số", path: "/queues" },
    { icon: FileSpreadsheet, name: "Báo cáo", path: "/reports" },
    { 
      icon: Settings, 
      name: "Cài đặt hệ thống", 
      path: "/settings",
      submenu: [
        { icon: Users, name: 'Quản lý tài khoản', path: '/settings/users' },
        { icon: FileText, name: 'Nhật ký người dùng', path: '/settings/logs' },
      ]
    }
  ];

  return (
    <aside className="flex flex-col justify-between h-full w-64 md:w-72 p-4 select-none">
      <div className="w-full space-y-6">
        {/* Brand Clay Logo Card */}
        <div className="clay-card p-4 flex items-center justify-center gap-3">
          <img src={logo} alt="Alta Logo" className="h-10 object-contain drop-shadow-sm" />
          <div className="flex flex-col">
            <span className="font-bold text-lg text-slate-800 tracking-tight">ALTA QUEUE</span>
            <span className="text-[10px] font-semibold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
              System v2.0
            </span>
          </div>
        </div>

        {/* Clay Navigation List */}
        <nav className="w-full">
          <ul className="space-y-2.5">
            {MENU.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              
              return (
                <li key={index} className="relative group">
                  <NavLink
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                      isActive
                        ? "clay-card-orange text-white transform scale-[1.02]"
                        : "text-slate-600 hover:text-orange-500 hover:bg-white/80 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-all ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-orange-50 group-hover:text-orange-500"
                      }`}>
                        <Icon size={18} />
                      </div>
                      <span>{item.name}</span>
                    </div>

                    {item.submenu && (
                      <ChevronRight size={16} className={`transition-transform duration-200 ${isActive ? "text-white" : "text-slate-400 group-hover:translate-x-0.5"}`} />
                    )}
                  </NavLink>

                  {/* Submenu Dropdown / Flyout */}
                  {item.submenu && (
                    <ul className="hidden group-hover:block absolute left-full top-0 ml-3 w-56 clay-card p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                        {item.name}
                      </div>
                      {item.submenu.map((sub, subIndex) => {
                        const SubIcon = sub.icon;
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <li key={subIndex}>
                            <NavLink
                              to={sub.path}
                              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                isSubActive
                                  ? "bg-orange-500 text-white shadow-sm"
                                  : "text-slate-600 hover:bg-orange-50 hover:text-orange-500"
                              }`}
                            >
                              <SubIcon size={15} />
                              <span>{sub.name}</span>
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Logout Clay Button */}
      <button
        onClick={() => logout.mutate()}
        className="clay-btn bg-white hover:bg-rose-50 text-rose-600 border border-rose-100 hover:border-rose-200 w-full py-3 text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 mt-6"
      >
        <div className="p-1.5 rounded-lg bg-rose-100 text-rose-500">
          <LogOut size={16} />
        </div>
        <span>Đăng xuất</span>
      </button>
    </aside>
  );
};

export default Sidebar;