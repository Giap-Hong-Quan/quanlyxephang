import { useEffect } from "react";
import { useProfile } from "../../hooks/authQuery";
import { useHeaderStore } from "../../store/useHeaderStore";
import { useUI } from "../../context/UiProvider";
import { User, Mail, Phone, ShieldCheck, Sparkles, Camera } from "lucide-react";

const Profile = () => {
  const { setLoading } = useUI();
  const { data, isLoading } = useProfile();

  useEffect(() => {
    useHeaderStore.setState({ title: "Thông tin cá nhân", subTitle: "Hồ sơ người dùng" });
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  let displayRole = "Người dùng hệ thống";
  const roleName = data?.data?.role?.name;
  if (roleName === "admin") displayRole = "Quản trị viên (Admin)";
  else if (roleName === "staff") displayRole = "Nhân viên cấp số";
  else if (roleName === "doctor" || roleName === "docter") displayRole = "Bác sĩ khám bệnh";

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-8">
      {/* Header Clay Card */}
      <div className="clay-card p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
            <User size={22} />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-800">Hồ Sơ Cá Nhân</h2>
            <p className="text-xs text-slate-400">Xem và quản lý thông tin tài khoản của bạn</p>
          </div>
        </div>
        <span className="clay-badge clay-badge-completed">
          <Sparkles size={14} />
          <span>Tài khoản đã xác thực</span>
        </span>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Col: Avatar Card */}
        <div className="clay-card p-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative">
            {data?.data?.avatar_url ? (
              <img
                src={data?.data?.avatar_url}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-extrabold text-4xl border-4 border-white shadow-md">
                {data?.data?.full_name?.charAt(0) || "U"}
              </div>
            )}
            <button className="absolute bottom-1 right-1 p-2 rounded-full bg-orange-500 text-white shadow-md hover:scale-105 transition-transform">
              <Camera size={16} />
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-800">{data?.data?.full_name}</h3>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 inline-block">
              {displayRole}
            </span>
          </div>
        </div>

        {/* Right Col: Details Card */}
        <div className="md:col-span-2 clay-card p-8 space-y-6">
          <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <ShieldCheck size={18} className="text-orange-500" />
            Chi tiết thông tin
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <User size={14} className="text-orange-500" />
                Họ và tên
              </span>
              <div className="clay-input w-full font-bold text-slate-800 text-sm">
                {data?.data?.full_name || 'N/A'}
              </div>
            </div>

            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Mail size={14} className="text-orange-500" />
                Địa chỉ Email
              </span>
              <div className="clay-input w-full font-bold text-slate-800 text-sm">
                {data?.data?.email || 'N/A'}
              </div>
            </div>

            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Phone size={14} className="text-orange-500" />
                Số điện thoại
              </span>
              <div className="clay-input w-full font-bold text-slate-800 text-sm font-mono">
                {data?.data?.phone || 'Chưa cập nhật'}
              </div>
            </div>

            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-orange-500" />
                Vai trò truy cập
              </span>
              <div className="clay-input w-full font-bold text-orange-600 text-sm">
                {displayRole}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;