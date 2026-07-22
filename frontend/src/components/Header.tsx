import { ChevronRight, Bell, User, Sparkles } from "lucide-react";
import { useHeaderStore } from "../store/useHeaderStore";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/authQuery";

const Header = () => {
  const navigate = useNavigate();
  const title = useHeaderStore((state) => state.title);
  const subTitle = useHeaderStore((state) => state.subTitle);
  const { data, isLoading } = useProfile();

  return (
    <header className="flex h-16 items-center justify-between w-full mb-2">
      {/* Breadcrumb / Title Clay Card */}
      <div className="clay-card px-5 py-2.5 flex items-center gap-2 text-sm font-semibold">
        <div className="flex items-center gap-2 text-slate-500">
          <Sparkles size={16} className="text-orange-500" />
          <span>{title}</span>
        </div>
        {subTitle && (
          <>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="text-orange-600 font-bold bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-100">
              {subTitle}
            </span>
          </>
        )}
      </div>

      {/* User Actions & Profile Clay Pill */}
      <div className="flex items-center gap-4">
        {/* Notification Bell Clay Button */}
        <div className="relative cursor-pointer clay-btn p-3 rounded-2xl bg-white hover:bg-orange-50 transition-all">
          <Bell size={18} className="text-slate-600 hover:text-orange-500" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-sm animate-pulse">
            3
          </span>
        </div>

        {/* Profile Card */}
        <div
          onClick={() => navigate("/profile")}
          className="clay-card px-4 py-2 flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
        >
          <div className="relative">
            {isLoading ? (
              <div className="w-9 h-9 rounded-full bg-slate-200 animate-pulse" />
            ) : data?.data?.avatar_url ? (
              <img
                src={data?.data?.avatar_url}
                alt="Avatar"
                className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                <User size={18} />
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Xin chào</span>
            <span className="text-xs font-bold text-slate-700 leading-tight">
              {isLoading ? "..." : data?.data?.full_name || "Quản trị viên"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;